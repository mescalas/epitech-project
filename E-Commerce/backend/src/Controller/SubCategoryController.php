<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\SubCategory;
use App\Repository\SubCategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class SubCategoryController extends AbstractController
{
    private $validator;

    public function __construct( ValidatorInterface $validator )
    {
        $this->validator = $validator;
    }
    
    public function findAllSubCategory( SubCategoryRepository $subCategoryRepository ): Response
    {
        return $this->json( $subCategoryRepository->findAll(), 200, [], ['groups' => 'subcategory_read'] );
    }

    public function createSubcategory( Request $request ): Response
    {
        $validatorInterface = $this->validator;
        $entityManager      = $this->getDoctrine()->getManager();

        $data = $request->getContent();
        $data = json_decode( $data, true );

        $subcategory = new SubCategory();
        $this->setDataOnObject( $data, $subcategory );
        $errors = $validatorInterface->validate( $subcategory );
        if ( count( $errors ) > 0 )
        {
            return $this->json( $errors, 500 );
        }

        $entityManager->persist( $subcategory );
        $entityManager->flush();

        return $this->json( "Sub-category saved successfully" );
    }

    public function setDataOnObject( array $data, object $object )
    {
        foreach ( $data as $key => $value )
        {
            if($key === "id") continue;
            if ( $key === "category" )
            {
                $subCategory = $this->getDoctrine()
                                    ->getRepository( Category::class )
                                    ->find( $value );

                $func = 'set' . ucfirst( $key );
                $object->$func( $subCategory );
                continue;
            }
            $func = 'set' . ucfirst( $key );
            $object->$func( $value );
        }
    }

    public function updateSubCategory( Request $request, ValidatorInterface $validatorInterface ): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        $entityManager = $this->getDoctrine()->getManager();

        $subcategory = $entityManager->getRepository( SubCategory::class )->find( $data['id'] );
        if ( !$subcategory )
        {
            return $this->json( "No sub-category found for id " . $data['id'], 500 );
        }

        $this->setDataOnObject( $data, $subcategory );
        $errors = $validatorInterface->validate( $subcategory );
        if ( count( $errors ) > 0 )
        {
            return $this->json( $errors, 500 );
        }

        $entityManager->flush();

        return $this->json( "Sub-category updated successfully" );
    }

    public function readSubCategory( int $id ): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $subcategory   = $entityManager->getRepository( SubCategory::class )->find( $id );
        if ( !$subcategory )
        {
            return $this->json( "No sub-category found for id " . $id );
        }

        return $this->json( $subcategory, 200, [], ["groups" => "subcategory_read"] );
    }

    public function deleteSubCategory(Request $request): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        if(!isset($data['id'])) {
            return $this->json( 'An error has occurred : data id needed', 500 );
        }

        $entityManager = $this->getDoctrine()->getManager();

        foreach ($data['id'] as $value) {

            $subCategory = $entityManager->getRepository( SubCategory::class )->find( $value );

            if(!$subCategory) {
                return $this->json( 'An error has occurred : sub-categories doesn\'t exist', 500 );
            }

            $entityManager->remove( $subCategory );
            $entityManager->flush();
        }

        return $this->json( "Sub-categories deleted successfully" );
    }

    public function getBrand(Request $request, SubCategoryRepository $subCategoryRepository): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        $id   = isset( $data['id'] ) ? $data['id'] : "%";
        
        $result = $subCategoryRepository->getBrand($id);
        return $this->json( $result );
    }
}
