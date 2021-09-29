<?php

namespace App\Controller;

use App\Entity\ProductImage;
use App\Repository\ProductImageRepository;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProductImageController extends AbstractController
{
    public function addProductImage(Request $request, ProductRepository $productRepository): Response
    {
        $image = $_FILES['image'];
        $id = $_POST['id'];

        $product = $productRepository->find($id);

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

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist( $productImage );       
            $entityManager->flush();
        }

        return $this->json( 'Image(s) added successfully', 200 );
    }

    public function deleteProductImage(Request $request, ProductImageRepository $productImageRepository): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        foreach ($data['id'] as $key => $value) {
            
            $image = $productImageRepository->find($value);
            if ( !$image )
            {
                return $this->json( "An error has occurred : Image $value doesn't exist", 500 );
            }

            unlink($image->getImage());
            
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove( $image );
            $entityManager->flush();
        }

        return $this->json( 'Image(s) deleted successfully', 200 );
    }
}
