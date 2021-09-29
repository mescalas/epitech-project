<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\ProductImage;
use App\Entity\SubCategory;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ProductController extends AbstractController
{
    public function findAllProduct( ProductRepository $productRepository ): Response
    {
        return $this->json( $productRepository->findAll(), 200, [], ['groups' => 'product_read'] );
    }

    public function createProduct( Request $request, ValidatorInterface $validator ): Response
    { 
        $entityManager = $this->getDoctrine()->getManager();
        $data = $_POST;
        $explodeCharac = explode(',', $data['characteristic']);
        $explodeCharac1 = [];
        
        foreach ($explodeCharac as $key => $value) {
            $explodeCharac1[] = explode(":", $value);
        }
        
        foreach ($explodeCharac1 as $key => $value) {
            $arr[$value[0]] = $value[1];
        }
        $data['characteristic'] = $arr;
        $image = $_FILES['image'];
        
        $product = new Product();
        $this->setDataOnObject( $data, $product );        
        $errors = $validator->validate( $product );
        if ( count( $errors ) > 0 )
        {
            return $this->json( $errors, 500 );
        }

        $entityManager->persist( $product );       
        $entityManager->flush();
        
        for ($i=0; $i < count($image['name']); $i++) { 
            
            if($image['type'][$i] !== 'image/png' && $image['type'][$i] !== 'image/jpeg') {
                return $this->json( 'Image must be of type png or jpeg', 500 );
            }

            $fileExt = "." . strtolower(substr(strchr($image['name'][$i], "."), 1));
            $tmpName = $image['tmp_name'][$i];
            $uniqueName = md5(uniqid(rand(),true)) . $fileExt;
            $path = "./assets/product/";            
            move_uploaded_file($tmpName, $path.$uniqueName);

            $productImage = new ProductImage();
            $productImage->setImage($path.$uniqueName);
            $productImage->setProduct($product);

            $entityManager->persist( $productImage );       
            $entityManager->flush();
        }

        return $this->json( 'Product saved successfully' );
    }
    
    public function setDataOnObject( array $data = null, object $object )
    {
        foreach ( $data as $key => $value )
        {
            if ( $key === "id" )
            {
                continue;
            }

            if ($key === "featured") {
                if ( $value == "true" ) {
                    $object->setFeatured(true);
                } else {
                    $object->setFeatured(false);
                }
                continue;
            }
            
            if ( $key === "subCategory" )
            {
                $subCategory = $this->getDoctrine()
                ->getRepository( SubCategory::class )
                ->find( $value );

                $func = 'set' . ucfirst( $key );
                $object->$func( $subCategory );
                continue;
            }
            $func = 'set' . ucfirst( $key );
            $object->$func( $value );
        }
    }

    public function returnProductImage($imagePath): Response
    {
        return new BinaryFileResponse($imagePath);
    }

    public function updateProduct( Request $request, ValidatorInterface $validator ): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );
        $data['characteristic'] = implode(',', $data['characteristic']);
        $explodeCharac = explode(',', $data['characteristic']);
        $explodeCharac1 = [];
        
        foreach ($explodeCharac as $key => $value) {
            $explodeCharac1[] = explode(":", $value);
        }
        
        foreach ($explodeCharac1 as $key => $value) {
            $arr[$value[0]] = $value[1];
        }
        $data['characteristic'] = $arr;
        
        $entityManager = $this->getDoctrine()->getManager();

        $product = $entityManager->getRepository( Product::class )->find( $data['id'] );
        if ( !$product )
        {
            return $this->json( 'No product found for id ' . $data['id'], 500 );
        }

        $this->setDataOnObject( $data, $product );
        $errors = $validator->validate( $product );
        if ( count( $errors ) > 0 )
        {
            return $this->json( $errors, 500 );
        }

        $entityManager->flush();

        return $this->json( 'Product updated successfully' );
    }

    public function readProduct( int $id ): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $product = $entityManager->getRepository( Product::class )->find( $id );
        if ( !$product )
        {
            return $this->json( 'No product found for id ' . $id, 500 );
        }

        return $this->json( $product, 200, [], ['groups' => 'product_read'] );
    }

    public function deleteProduct( Request $request ): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        if(!isset($data['id'])) {
            return $this->json( 'An error has occurred : data id needed', 500 );
        }

        $entityManager = $this->getDoctrine()->getManager();

        foreach ( $data['id'] as $value )
        {
            $product = $entityManager->getRepository( Product::class )->find( $value );

            if ( !$product ) {
                return $this->json( 'An error has occurred : product(s) doesn\'t exist', 500 );
            }

            $entityManager->remove( $product );
            $entityManager->flush();
        }

        return $this->json( "Products deleted successfully" );
    }

    public function filterProduct( Request $request, ProductRepository $productRepository )
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        $subCategory = isset( $data['subCategory'] ) ? $data['subCategory'] : null;
        $name     = isset( $data['name'] ) ? $data['name'] : null;
        $minPrice = isset( $data['minPrice'] ) ? $data['minPrice'] : null;
        $maxPrice = isset( $data['maxPrice'] ) ? $data['maxPrice'] : null;
        $stock    = isset( $data['stock'] ) ? $data['stock'] : null;
        $brand    = isset( $data['brand'] ) ? $data['brand'] : null;
        $new      = isset( $data['new'] ) ? $data['new'] : null;
        $discount = isset( $data['discount'] ) ? $data['discount'] : null;
        
        $product  = $productRepository->filterProduct( $subCategory, $name, $minPrice, $maxPrice, $stock, $brand, $new, $discount );

        return $this->json( $product, 200, [], ['groups' => 'product_read'] );
    }

    public function findFeatured( ProductRepository $productRepository ): Response
    {
        return $this->json( $productRepository->getFeatured(), 200, [], ['groups' => 'featured_product'] );
    }

    public function addFeaturedProduct( Request $request ): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        if(!isset($data['id'])) {
            return $this->json( 'An error has occurred : data id needed', 500 );
        }

        foreach ( $data['id'] as $value )
        {
            $entityManager = $this->getDoctrine()->getManager();
            $product = $entityManager->getRepository( Product::class )->find( $value );
            if ( !$product )
            {
                return $this->json( "An error has occurred : Product $value doesn't exist", 500 );
            }
            $product->setFeatured(true);
            $entityManager->flush();
        }

        return $this->json( "Product(s) featured successfully" );
    }

    public function removeFeaturedProduct(Request $request): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );
        
        if(!isset($data['id'])) {
            return $this->json( 'An error has occurred : data id needed', 500 );
        }
        
        $entityManager = $this->getDoctrine()->getManager();

        foreach ( $data['id'] as $value )
        {
            $product = $entityManager->getRepository( Product::class )->find( $value );

            if ( !$product )
            {
                return $this->json( "An error has occurred : Product $value doesn't exist", 500 );
            }
            $product->setFeatured(false);
            $entityManager->flush();
        }

        return $this->json( "Product(s) removed from featured successfully" );
    }

    public function updateDiscount(Request $request): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        if(!isset($data['id']) || !isset($data['discount'])) {
            return $this->json( 'An error has occurred : id and discount needed', 500 );
        }

        $entityManager = $this->getDoctrine()->getManager();

        foreach ( $data['id'] as $value )
        {
            $product = $entityManager->getRepository( Product::class )->find( $value );

            if ( !$product ) {
                return $this->json( 'An error has occurred : product(s) doesn\'t exist', 500 );
            }

            $product->setDiscount($data['discount']);
            $entityManager->flush();
        }

        return $this->json( "Discount successfully updated" );
    }
    
}
