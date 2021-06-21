<?php

namespace App\Controller;

use App\Entity\Quiz;
use App\Entity\Question;
use App\Entity\Reponse;
use App\Entity\User;
use App\Entity\UserQuiz;
use App\Form\QuizType;
use App\Form\Question10Type;
use App\Form\Question20Type;
use App\Form\QuestionType;
use App\Repository\QuizRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

#[Route('/quiz')]
class QuizController extends AbstractController
{
	/**
	 * @var Security
	 */
	private $security;

	public function __construct(Security $security)
	{
		$this->security = $security;
	}

    #[Route('/', name: 'quiz_index', methods: ['GET'])]
    public function index(QuizRepository $quizRepository): Response
    {
        return $this->render('quiz/index.html.twig', [
            'quizzes' => $quizRepository->findAll(),
        ]);
    }

    #[Route('/question/{id}/10', name: 'question_10', methods: ['GET', 'POST'])]
    public function new10($id, Request $request) : Response
    {
        $question = new Question();
        $form = $this->createForm(Question10Type::class, $question);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $data = $_POST['question10'] ?? $_POST['question20'];
            $quiz = $this->getDoctrine()->getRepository(Quiz::class)->find($id);

            for ($i=1; $i <= 10; $i++) { 
                $question = new Question();
                $question->setQuiz($quiz);
                $question->setQuestion($data["question$i"]);
                $em->persist($question);
                $em->flush();
                for ($j=1; $j <= 3; $j++) { 
                    $reponse = new Reponse();
                    $reponse->setQuestion($question);
                    $reponse->setReponse($data["question$i"."_reponse$j"]);    
                    if($data["question$i"."_reponse_expected"] == $j) {
                        $reponse->setReponseExpected(1);
                    } else {
                        $reponse->setReponseExpected(0);
                    }
                    $em->persist($reponse);
                    $em->flush(); 
                }
            }
        }

        return $this->render('question/new.html.twig', [
            'question' => $question,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/question/{id}/20', name: 'question_20', methods: ['GET', 'POST'])]
    public function new20($id, Request $request) : Response
    {
        $question = new Question();
        $form = $this->createForm(Question20Type::class, $question);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $data = $_POST['question10'] ?? $_POST['question20'];
            $quiz = $this->getDoctrine()->getRepository(Quiz::class)->find($id);

            for ($i=1; $i <= 20; $i++) { 
                $question = new Question();
                $question->setQuiz($quiz);
                $question->setQuestion($data["question$i"]);
                $em->persist($question);
                $em->flush();
                for ($j=1; $j <= 3; $j++) { 
                    $reponse = new Reponse();
                    $reponse->setQuestion($question);
                    $reponse->setReponse($data["question$i"."_reponse$j"]);    
                    if($data["question$i"."_reponse_expected"] == $j) {
                        $reponse->setReponseExpected(1);
                    } else {
                        $reponse->setReponseExpected(0);
                    }
                    $em->persist($reponse);
                    $em->flush(); 
                }
            }
        }

        return $this->render('question/new.html.twig', [
            'question' => $question,
            'form' => $form->createView(),
        ]);
    }


    #[Route('/new', name: 'quiz_new', methods: ['GET', 'POST'])]
    public function new(Request $request): Response
    {
        $quiz = new Quiz();
        $form = $this->createForm(QuizType::class, $quiz);
        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
	        $user = $this->security->getUser();
	        $quiz->setUser($user);
	        $entityManager->persist($quiz);
            $entityManager->flush();

            $number = $form["number"]->getData();
            if ($number == 10){
                return $this->redirectToRoute('question_10', ['id' => $quiz->getId()]);
            } elseif ($number == 20){
                return $this->redirectToRoute('question_20', ['id' => $quiz->getId()]);
            } else {
              return $this->redirectToRoute('quiz_index');  
            }

        }

        return $this->render('quiz/new.html.twig', [
            'quiz' => $quiz,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'quiz_show', methods: ['GET'])]
    public function show(Quiz $quiz): Response
    {
        return $this->render('quiz/show.html.twig', [
            'quiz' => $quiz,
        ]);
    }

    #[Route('/{id}/edit', name: 'quiz_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Quiz $quiz): Response
    {
        $form = $this->createForm(QuizType::class, $quiz);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('quiz_index');
        }

        return $this->render('quiz/edit.html.twig', [
            'quiz' => $quiz,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'quiz_delete', methods: ['POST'])]
    public function delete(Request $request, Quiz $quiz): Response
    {
        if ($this->isCsrfTokenValid('delete'.$quiz->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($quiz);
            $entityManager->flush();
        }

        return $this->redirectToRoute('quiz_index');
    }

    #[Route('/{id_quiz}/{id_question}', name: 'answerQuestion', methods: ['GET', 'POST'])]
    public function answerQuestion($id_quiz, $id_question, Request $request, SessionInterface $session): Response
    {
        $quiz = $this->getDoctrine()->getRepository(Quiz::class)->find($id_quiz);
        $numberOfQuestions = $quiz->getQuestions()->count();
        $question = $quiz->getQuestions()->getValues();
        $question = $question[$id_question-1];
        $reponses = $question->getReponses()->getValues();
        $form = $this->createForm(QuestionType::class, $reponses);

        if ($id_question == 1) {
            $session->set('score', 0);
        } 
        
        $scoreSession = $session->get('score');

        if(empty($scoreSession)) {
            $score = 0;
        } else {
            $score = $scoreSession;
        }
        
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $reponse = $form->getData();
            $result = '';
            if ($reponse['reponse'] === 1) {
                $score += 1;
                $result = 'Success !';
                
            } else {
                $result = 'Failure ...';
            }

            $session->set('score', $score);

            if ($id_question == $numberOfQuestions) {

                if ($this->isGranted('ROLE_USER') == true) {
                    $entityManager = $this->getDoctrine()->getManager();

                    $id = $this->getUser()->getId();
                    $userQuiz = $this->getDoctrine()->getRepository(UserQuiz::class)->checkIfQuizExist($id_quiz, $id);

                    if($userQuiz) {
                        $userQuiz = $userQuiz[0];
                        $userQuiz->setScore($score);
                    } else {
                        $userQuiz = new UserQuiz(); 
                        $userQuiz->setUser($this->getUser());
                        $userQuiz->setQuiz($quiz);
                        $userQuiz->setScore($score);
                        $userQuiz->setCompleted(new \DateTime());
                    }

                    $entityManager->persist($userQuiz);
                    $entityManager->flush();

                } else {                    
                    setcookie($id_quiz, $score, 0, '/historique');
                }

                return $this->render('quiz/lastReponse.html.twig', [
                    'quizName' => $quiz->getName(),
                    'numberOfQuestions' => $numberOfQuestions,
                    'score' => $score,
                    'result' => $result,
                ]);
            }

            return $this->render('quiz/reponse.html.twig', [
                'quizName' => $quiz->getName(),
                'numberOfQuestions' => $numberOfQuestions,
                'score' => $score,
                'result' => $result,
                'id_quiz' => $id_quiz,
                'id_question' => $id_question
            ]);
        }

        return $this->render('quiz/question.html.twig', [
            'quizName' => $quiz->getName(),
            'questionNumber' => $id_question,
            'numberOfQuestions' => $numberOfQuestions,
            'question' => $question->getQuestion(),
            'form' => $form->createView()
        ]);
    }
}
