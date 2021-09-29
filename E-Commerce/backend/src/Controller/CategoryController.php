<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CategoryController extends AbstractController
{

    public function findAllCategory( CategoryRepository $categoryRepository ): Response
    {
        return $this->json( $categoryRepository->findAll(), 200, [], ['groups' => 'category_read'] );
    }

    public function createCategory( Request $request, ValidatorInterface $validatorInterface ): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $data = $request->getContent();
        $data = json_decode( $data, true );

        $category = new Category();
        $this->setDataOnObject( $data, $category );

        $errors = $validatorInterface->validate( $category );
        if ( count( $errors ) > 0 )
        {
            return $this->json( $errors, 500 );
        }

        $entityManager->persist( $category );
        $entityManager->flush();

        return $this->json( 'Category saved successfully' );
    }

    public function setDataOnObject( array $data, object $object )
    {
        foreach ( $data as $key => $value )
        {
            if($key === "id") continue;
            $func = 'set' . ucfirst( $key );
            $object->$func( $value );
        }
    }

    public function updateCategory( Request $request, ValidatorInterface $validatorInterface ): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        $entityManager = $this->getDoctrine()->getManager();
        $category      = $entityManager->getRepository( Category::class )->find( $data['id'] );
        if ( !$category )
        {
            return $this->json( 'No category found for id ' . $data['id'], 500 );
        }

        $this->setDataOnObject( $data, $category );

        $errors = $validatorInterface->validate( $category );
        if ( count( $errors ) > 0 )
        {
            return $this->json( $errors, 500 );
        }
        $entityManager->flush();

        return $this->json( 'Category updated successfully' );
    }

    public function readCategory( int $id ): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $category = $entityManager->getRepository( Category::class )->find( $id );
        if ( !$category )
        {
            return $this->json( "No category found for id " . $id, 500 );
        }

        return $this->json( $category, 200, [], ['groups' => 'category_read'] );
    }

    public function deleteCategory(Request $request): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        if(!isset($data['id'])) {
            return $this->json( 'An error has occurred : data id needed', 500 );
        }

        $entityManager = $this->getDoctrine()->getManager();

        foreach ($data['id'] as $value) 
            {
            $category = $entityManager->getRepository( Category::class )->find( $value );

            if(!$category) {
                return $this->json( 'An error has occurred : categories doesn\'t exist', 500 );
            }

            $entityManager->remove( $category );
            $entityManager->flush();
        }

        return $this->json( "Categories deleted successfully" );
    }
}
