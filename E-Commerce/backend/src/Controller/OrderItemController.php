<?php

namespace App\Controller;

use App\Entity\OrderItem;
use App\Entity\Product;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class OrderItemController extends AbstractController
{
    public function setDataOnObject( array $data, object $object )
    {
        foreach ( $data as $key => $value )
        {
            if ( $key === "id" )
            {
                continue;
            }

            if ( $key === "user" )
            {
                $subCategory = $this->getDoctrine()
                                    ->getRepository( User::class )
                                    ->find( $value );

                $func = 'set' . ucfirst( $key );
                $object->$func( $subCategory );
                continue;
            }

            $func = 'set' . ucfirst( $key );
            $object->$func( $value );
        }
    }

    public function createOrderItem( Request $request, ValidatorInterface $validator ): Response
    {
        $data      = $request->getContent();
        $data      = json_decode( $data, true );
        $orderItem = new OrderItem();
        $this->setDataOnObject( $data, $orderItem );

        $errors = $validator->validate( $orderItem );
        if ( count( $errors ) > 0 )
        {
            return $this->json( $errors, 500 );
        }
        // dd($orderItem);
        $entityManager = $this->getDoctrine()->getManager();
        foreach ($data['products'] as $key => $value) {
            $product = $this->getDoctrine()
            ->getRepository( Product::class )
            ->find( $key );
            $product->setQuantity($product->getQuantity() - $value);
            $entityManager->flush();
        }

        $entityManager->persist( $orderItem );
        $entityManager->flush();
        $lastId = $orderItem->getId();

        return $this->json( $lastId );
    }

    public function readOrderItem( int $id ): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $orderItem = $entityManager->getRepository( OrderItem::class )->findOneBy( ['order_id' => $id] );
        if ( !$orderItem )
        {
            return $this->json( 'No order for reference' . $id, 500 );
        }

        return $this->json( $orderItem, 200 );
    }

    public function deleteOrderItem( Request $request ): Response
    {
        $id            = $request->getContent();
        $entityManager = $this->getDoctrine()->getManager();

        $orderItem = $entityManager->getRepository( OrderItem::class )->findOneBy( ['order_id' => $id] );

        if ( !$orderItem )
        {
            return $this->json( 'An error has occurred : order doesn\'t exist', 500 );
        }

        $entityManager->remove( $orderItem );
        $entityManager->flush();

        return $this->json( "Order canceled" );
    }
}
