<?php

namespace App\Controller;

use App\Entity\PaymentMethod;
use App\Entity\User;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class PaymentMethodController extends AbstractController
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
                $user = $this->getDoctrine()
                ->getRepository( User::class )
                ->findBy(['email' => $value]);
                $func = 'set' . ucfirst( $key );
                $object->$func( $user[0] );
                continue;
            }
            $func = 'set' . ucfirst( $key );
            $object->$func( $value );
        }
    }

    public function createPaymentMethod( Request $request, ValidatorInterface $validator ): Response
    {    
        $data = $request->getContent();
        $data = json_decode( $data, true );
        // dd($data);
        $paymentMethod = new PaymentMethod();
        $this->setDataOnObject( $data, $paymentMethod );

        $errors = $validator->validate( $paymentMethod );
        if ( count( $errors ) > 0 )
        {
            return $this->json( $errors, 500 );
        }
        
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist( $paymentMethod );       
        $entityManager->flush();

        return $this->json( 'Payment method saved successfully' );
    }

    public function updatePaymentMethod(Request $request, ValidatorInterface $validator ): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        if(!isset($data['id'])) {
            return $this->json( 'An error has occurred : data id needed', 500 );
        }

        $entityManager = $this->getDoctrine()->getManager();

        $paymentMethod = $entityManager->getRepository( PaymentMethod::class )->find( $data['id'] );
        if ( !$paymentMethod )
        {
            return $this->json( 'No payment method found for id ' . $data['id'], 500 );
        }
        
        $this->setDataOnObject( $data, $paymentMethod );
        
        $errors = $validator->validate( $paymentMethod );
        if ( count( $errors ) > 0 )
        {
            return $this->json( $errors, 500 );
        }
        
        $entityManager->flush();

        return $this->json( 'Payment method updated successfully' );
    }

    public function deletePaymentMethod( Request $request ): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        if(!isset($data['id'])) {
            return $this->json( 'An error has occurred : data id needed', 500 );
        }

        $entityManager = $this->getDoctrine()->getManager();

        foreach ( $data['id'] as $value )
        {
            $paymentMethod = $entityManager->getRepository( PaymentMethod::class )->find( $value );

            if ( !$paymentMethod ) {
                return $this->json( 'An error has occurred : payment method(s) doesn\'t exist', 500 );
            }

            $entityManager->remove( $paymentMethod );
            $entityManager->flush();
        }

        return $this->json( "Payment method(s) deleted successfully" );
    }

    public function getPaymentMethodByUser( string $email ): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $user = $entityManager->getRepository( User::class )->findBy( ['email' => $email] );
        if ( !$user )
        {
            return $this->json( 'No payment method for user email ' . $email, 500 );
        }

        return $this->json( $user, 200, [], ['groups' => 'user_payment'] );
    }

    public function readPaymentMethod( int $id ): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $paymentMethod = $entityManager->getRepository( PaymentMethod::class )->find( $id );
        if ( !$paymentMethod )
        {
            return $this->json( 'No Payment method for id ' . $id, 500 );
        }

        return $this->json( $paymentMethod, 200, [], ['groups' => 'payment_read'] );
    }
    
}
