<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AdminController extends AbstractController
{
    public function index(UserPasswordEncoderInterface $encoder): Response
    {
        /*$user_ = new User();
        $user_->setPassword($encoder->encodePassword($user_, "admin"));
        $user_->setEmail("admin@admin.com");
        $user_->setRoles((array)"ROLE_ADMIN");
        $em = $this->getDoctrine()->getManager();

        $em->persist($user_);
        $em->flush();*/
        $user = $this->getUser();
        $data =
            [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'role' => $user->getRoles()
            ];

        return new JsonResponse($data);
    }
}
