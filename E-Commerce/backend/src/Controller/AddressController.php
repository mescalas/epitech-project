<?php

namespace App\Controller;

use App\Entity\Address;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AddressController extends AbstractController
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

    public function createAddress( Request $request, ValidatorInterface $validator ): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );
        unset( $data['email'] );
        $address = new Address();
        $this->setDataOnObject( $data, $address );

        $errors = $validator->validate( $address );
        if ( count( $errors ) > 0 )
        {
            return $this->json( $errors, 500 );
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist( $address );
        $entityManager->flush();
        $lastId = $address->getId();

        return $this->json( $lastId );
    }

    public function updateAddress( Request $request, ValidatorInterface $validator ): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        if ( !isset( $data['id'] ) )
        {
            return $this->json( 'An error has occurred : data id needed', 500 );
        }

        $entityManager = $this->getDoctrine()->getManager();

        $address = $entityManager->getRepository( Address::class )->find( $data['id'] );
        if ( !$address )
        {
            return $this->json( 'No address found for id ' . $data['id'], 500 );
        }

        $this->setDataOnObject( $data, $address );

        $errors = $validator->validate( $address );
        if ( count( $errors ) > 0 )
        {
            return $this->json( $errors, 500 );
        }

        $entityManager->flush();
        $orderId = $address->getId();
        dd( $orderId );

        return $this->json( 'Address updated successfully' );
    }

    public function deleteAddress( Request $request ): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        if ( !isset( $data['id'] ) )
        {
            return $this->json( 'An error has occurred : data id needed', 500 );
        }

        $entityManager = $this->getDoctrine()->getManager();

        foreach ( $data['id'] as $value )
        {
            $address = $entityManager->getRepository( Address::class )->find( $value );

            if ( !$address )
            {
                return $this->json( 'An error has occurred : address(es) doesn\'t exist', 500 );
            }

            $entityManager->remove( $address );
            $entityManager->flush();
        }

        return $this->json( "Address(es) deleted successfully" );
    }

    public function getAddressByUser( string $email ): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $user = $entityManager->getRepository( User::class )->findBy( ['email' => $email] );
        if ( !$user )
        {
            return $this->json( 'No address for user email ' . $email, 500 );
        }

        return $this->json( $user, 200, [], ['groups' => 'user_address'] );
    }

    public function readAddress( int $id ): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $address = $entityManager->getRepository( Address::class )->find( $id );
        if ( !$address )
        {
            return $this->json( 'No address for id ' . $id, 500 );
        }

        return $this->json( $address, 200, [], ['groups' => 'address_read'] );
    }
}
