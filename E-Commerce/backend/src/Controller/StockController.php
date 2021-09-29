<?php

namespace App\Controller;

use App\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class StockController extends AbstractController
{
    public function updateStock( Request $request ): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $data = $request->getContent();
        $data = json_decode( $data, true );

        $product = $entityManager->getRepository( Product::class )->find( $data['id'] );
        if ( !$product )
        {
            return $this->json( 'No product found for id ' . $data['id'], 500 );
        }
        
        $product->setQuantity($data['quantity']);
        $entityManager->persist($product);
        $entityManager->flush();

        return $this->json( 'Stock updated successfully' );
    }
}