<?php

namespace App\Controller;

use App\Entity\Order;
use App\Entity\User;
use App\Repository\OrderRepository;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class OrderController extends AbstractController
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

    public function createOrder( Request $request, ValidatorInterface $validator, MailerInterface $mailer ): Response
    {
        $data      = $request->getContent();
        $data      = json_decode( $data, true );
        $reference = $data['reference'];
        $mail      = $data['userId'];
        $order     = new Order();
        $this->setDataOnObject( $data, $order );

        $errors = $validator->validate( $order );
        if ( count( $errors ) > 0 )
        {
            return $this->json( $errors, 500 );
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist( $order );
        $entityManager->flush();

        $email = ( new TemplatedEmail() )->from( new Address( 'lorrntech@gmail.com', "Lorr'N Tech" ) )->to( $mail )->subject( "Merci pour votre achat chez Lorr'N Tech !" )->htmlTemplate( 'facture/order.html.twig' )->context( [
            'reference' => $reference,
        ] )->attachFromPath( '../public/assets/facture.pdf', 'Facture', 'application/pdf' );
        $mailer->send( $email );

        $lastId = $order->getId();

        return $this->json( $lastId );
    }

    public function readOrder( string $ref ): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $order = $entityManager->getRepository( Order::class )->findOneBy( ['reference' => $ref] );
        if ( !$order )
        {
            return $this->json( 'No order for reference ' . $ref, 500 );
        }

        return $this->json( $order, 200 );
    }

    public function deleteOrder( Request $request ): Response
    {
        $ref           = $request->getContent();
        $entityManager = $this->getDoctrine()->getManager();

        $order = $entityManager->getRepository( Order::class )->findOneBy( ['reference' => $ref] );

        if ( !$order )
        {
            return $this->json( 'An error has occurred : order doesn\'t exist', 500 );
        }

        $entityManager->remove( $order );
        $entityManager->flush();

        return $this->json( "Order canceled" );
    }

    public function getOrderbyUser( string $email, OrderRepository $orderRepository ): Response
    {

        $order = $orderRepository->getByUser($email);

        
        if ( !$order )
        {
            return $this->json( 'No order for user email ' . $email, 500 );
        }
        
        return $this->json( $order, 200, [] );
    }

}
