<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class UserController extends AbstractController
{

    public function findAllUser( UserRepository $userRepository ): Response
    {
        return $this->json( $userRepository->findAll() );
    }

    public function UpdateUser( Request $request, ValidatorInterface $validatorInterface, UserPasswordEncoderInterface $encoder ): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        $entityManager = $this->getDoctrine()->getManager();
        $user          = $entityManager->getRepository( User::class )->findBy(['email' => $data['email']]);
        if ( !$user )
        {
            return $this->json( 'No user found for email : ' . $data['email'], 500 );
        }
        $user = $user[0];

        if(isset($data['newEmail'])) {
            $user->setEmail($data['newEmail']);
        }

        if(isset($data['password'])) {
            if(!$encoder->isPasswordValid($user, $data['password'])) {
                return $this->json('Password doesn\'t match');
            }
            $user->setPassword($encoder->encodePassword($user, $data['newPassword']));
        }

        $errors = $validatorInterface->validate( $user );
        if ( count( $errors ) > 0 )
        {
            return $this->json( $errors, 500 );
        }
        $entityManager->flush();

        return $this->json( 'User updated successfully' );
    }

    public function readUser( int $id ): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $user = $entityManager->getRepository( User::class )->find( $id );
        if ( !$user )
        {
            return $this->json( "No user found for id " . $id, 500 );
        }

        return $this->json( $user, 200 );
    }

    public function deleteUser(Request $request): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        if(!isset($data['id'])) {
            return $this->json( 'An error has occurred : data id needed', 500 );
        }

        $entityManager = $this->getDoctrine()->getManager();

        foreach ($data['id'] as $value) {

            $user = $entityManager->getRepository( User::class )->find( $value );

            if(!$user) {
                return $this->json( 'An error has occurred : user(s) doesn\'t exist', 500 );
            }

            $entityManager->remove( $user );
            $entityManager->flush();
        }

        return $this->json( "User(s) deleted successfully" );
    }
}