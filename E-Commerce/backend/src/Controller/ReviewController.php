<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Review;
use App\Entity\User;
use App\Repository\ReviewRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ReviewController extends AbstractController
{
    public function checkIfUserCanReview(Request $request, ReviewRepository $reviewRepository): Response
    {
        $userEmail = $request->query->get('user');
        $productId = $request->query->get('id');

        $result = $reviewRepository->getProductIdByUserOrder($userEmail);

        foreach ($result as $key => $value) {
            $arrValue= array_keys($value['products']);
            if ( $productId == $arrValue[0]) {
                return $this->json(true);
            }
        }

        return $this->json(false);
    }

    public function createReview(Request $request, ValidatorInterface $validator, UserRepository $userRepository): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        if( !isset($data['email']) || !isset($data['product_id']) || !isset($data['rating']) || !isset($data['comment'])) {
            return $this->json("Error : data email, product_id, rating, comment needed", 500);
        }

        $user = $this->getDoctrine()->getRepository( User::class )->findOneBy(['email' => $data['email']]);
        $product = $this->getDoctrine()->getRepository( Product::class )->find($data['product_id']);

        $review = new Review();
        $review->setUser($user);
        $review->setProduct($product);
        $review->setRating($data['rating']);
        $review->setComment($data['comment']);


        $errors = $validator->validate( $review );
        if ( count( $errors ) > 0 )
        {
            return $this->json( $errors, 500 );
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist( $review );
        $entityManager->flush();

        return $this->json("Review added successfully");
    }
}
