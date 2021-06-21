<?php

namespace App\Controller;

use App\Entity\Quiz;
use App\Entity\UserQuiz;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserQuizController extends AbstractController
{
    #[Route('/historique', name: 'historique', methods: ['GET'])]
    public function historique(): Response {

        if ($this->isGranted('ROLE_USER') == true) {
            $userId = $this->getUser()->getId();
            $repo = $this->getDoctrine()->getRepository(UserQuiz::class);
            $userQuiz = $repo->findByUserId($userId);

            return $this->render('quiz/historique.html.twig', [
                'userHistorique' => $userQuiz
            ]);

        } else {
            $cookie = $_COOKIE;
            $guestHistorique = [];
            $repo = $this->getDoctrine()->getRepository(Quiz::class);
            
            if (!empty($cookie)) {
                foreach ($cookie as $key => $value) {
                    if ($key === 'PHPSESSID') continue;
                    $name = $repo->find($key)->getName();
                    $guestHistorique[$name] = $value;
                }
                return $this->render('quiz/historique.html.twig', [
                    'guestHistorique' => $guestHistorique
                ]);        
            } else {
                return $this->render('quiz/historique.html.twig'); 
            }

        }
    }
}
