<?php

namespace App\Controller;

use App\Entity\Quiz;
use App\Entity\User;
use App\Entity\UserQuiz;
use App\Form\RegisterUserType;
use CMEN\GoogleChartsBundle\GoogleCharts\Charts\AreaChart;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Security;

class AdminController extends AbstractController
{
	/**
	 * @var Security
	 */
	private $security;

	public function __construct(Security $security)
	{
		$this->security = $security;
	}

	#[Route('/admin', name: 'admin', methods: ['GET', 'POST'])]
	public function adminPanel(Request $request)
	{
		$this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
		$entityManager = $this->getDoctrine()->getManager();
		$users = $entityManager->getRepository(User::class)->findAll();
		$oldUsers = $entityManager->getRepository(User::class)->lastTimeConnectedMore();
		$newUsers = $entityManager->getRepository(User::class)->lastTimeConnectedLess();
		$quizs = $entityManager->getRepository(Quiz::class)->findAll();


		$userPerDay = $this->getDoctrine()->getRepository(User::class)->UserPerDay();

		$params = [];
		array_push($params, ['Date', 'Users',]);

		for ($i = 0; $i < count($userPerDay); $i++) {
			$userPerDay[$i]['Users'] = intval($userPerDay[$i]['Users']);
			array_push($params, $userPerDay[$i]);
		}

		$Chart = new AreaChart();
		$Chart->getData()->setArrayToDataTable($params);
		$Chart->getOptions()->setTitle('New Users Each Day');
		$Chart->getOptions()->setHeight(400);
		$Chart->getOptions()->setWidth(600);
		$Chart->getOptions()->setBackgroundColor('rgb(243, 244, 246)');
		$Chart->getOptions()->getTitleTextStyle()->setColor('#07600');
		$Chart->getOptions()->getTitleTextStyle()->setFontSize(25);
		$Chart->getOptions()->getVAxis()->setMinValue(0);
		$Chart->getOptions()->getVAxis()->setMaxValue(10);

		$quizPerDay = $this->getDoctrine()->getRepository(User::class)->QuizPerDay();

		$params_ = [];
		array_push($params_, ['Date', 'Quizzes Done',]);

		for ($i = 0; $i < count($quizPerDay); $i++) {
			$quizPerDay[$i]['Quizs'] = intval($quizPerDay[$i]['Quizs']);
			array_push($params_, $quizPerDay[$i]);
		}

		$Chart_ = new AreaChart();
		$Chart_->getData()->setArrayToDataTable($params_);
		$Chart_->getOptions()->setTitle('Quizzes Done Each Day');
		$Chart_->getOptions()->setHeight(400);
		$Chart_->getOptions()->setWidth(400);
		$Chart_->getOptions()->setBackgroundColor('rgb(243, 244, 246)');
		$Chart_->getOptions()->getTitleTextStyle()->setColor('#07600');
		$Chart_->getOptions()->getTitleTextStyle()->setFontSize(25);
		$Chart_->getOptions()->getVAxis()->setMinValue(0);
		$Chart_->getOptions()->getVAxis()->setMaxValue(10);

		$quizLastWeek = $this->getDoctrine()->getRepository(User::class)->QuizLastWeek();

		$params1 = [];
		array_push($params1, ['Date', 'Quizzes Done',]);

		for ($i = 0; $i < count($quizLastWeek); $i++) {
			$quizLastWeek[$i]['Quizs'] = intval($quizLastWeek[$i]['Quizs']);
			array_push($params1, $quizLastWeek[$i]);
		}

		$Chart1 = new AreaChart();
		$Chart1->getData()->setArrayToDataTable($params1);
		$Chart1->getOptions()->setTitle('Quizzes Done Last Month');
		$Chart1->getOptions()->setHeight(400);
		$Chart1->getOptions()->setWidth(400);
		$Chart1->getOptions()->setBackgroundColor('rgb(243, 244, 246)');
		$Chart1->getOptions()->getTitleTextStyle()->setColor('#07600');
		$Chart1->getOptions()->getTitleTextStyle()->setFontSize(25);
		$Chart1->getOptions()->getVAxis()->setMinValue(0);
		$Chart1->getOptions()->getVAxis()->setMaxValue(10);

		$quizLastMonth = $this->getDoctrine()->getRepository(User::class)->QuizLastMonth();

		$params2 = [];
		array_push($params2, ['Date', 'Quizzes Done',]);

		for ($i = 0; $i < count($quizLastMonth); $i++) {
			$quizLastMonth[$i]['Quizs'] = intval($quizLastMonth[$i]['Quizs']);
			array_push($params2, $quizLastMonth[$i]);
		}

		$Chart2 = new AreaChart();
		$Chart2->getData()->setArrayToDataTable($params2);
		$Chart2->getOptions()->setTitle('Quizzes Done Last Week');
		$Chart2->getOptions()->setHeight(400);
		$Chart2->getOptions()->setWidth(600);
		$Chart2->getOptions()->setBackgroundColor('rgb(243, 244, 246)');
		$Chart2->getOptions()->getTitleTextStyle()->setColor('#07600');
		$Chart2->getOptions()->getTitleTextStyle()->setFontSize(25);
		$Chart2->getOptions()->getVAxis()->setMinValue(0);
		$Chart2->getOptions()->getVAxis()->setMaxValue(10);

		$userLastMonth = $this->getDoctrine()->getRepository(User::class)->UserLastMonth();

		$params3 = [];
		array_push($params3, ['Date', 'Users',]);

		for ($i = 0; $i < count($userLastMonth); $i++) {
			$userLastMonth[$i]['Users'] = intval($userLastMonth[$i]['Users']);
			array_push($params3, $userLastMonth[$i]);
		}

		$Chart3 = new AreaChart();
		$Chart3->getData()->setArrayToDataTable($params3);
		$Chart3->getOptions()->setTitle('New Users Last Month');
		$Chart3->getOptions()->setHeight(400);
		$Chart3->getOptions()->setWidth(600);
		$Chart3->getOptions()->setBackgroundColor('rgb(243, 244, 246)');
		$Chart3->getOptions()->getTitleTextStyle()->setColor('#07600');
		$Chart3->getOptions()->getTitleTextStyle()->setFontSize(25);
		$Chart3->getOptions()->getVAxis()->setMinValue(0);
		$Chart3->getOptions()->getVAxis()->setMaxValue(10);

		$userLastWeek = $this->getDoctrine()->getRepository(User::class)->UserLastWeek();

		$params4 = [];
		array_push($params4, ['Date', 'Users',]);

		for ($i = 0; $i < count($userLastWeek); $i++) {
			$userLastWeek[$i]['Users'] = intval($userLastWeek[$i]['Users']);
			array_push($params4, $userLastWeek[$i]);
		}

		$Chart4 = new AreaChart();
		$Chart4->getData()->setArrayToDataTable($params4);
		$Chart4->getOptions()->setTitle('New Users Last Week');
		$Chart4->getOptions()->setHeight(400);
		$Chart4->getOptions()->setWidth(400);
		$Chart4->getOptions()->setBackgroundColor('rgb(243, 244, 246)');
		$Chart4->getOptions()->getTitleTextStyle()->setColor('#07600');
		$Chart4->getOptions()->getTitleTextStyle()->setFontSize(25);
		$Chart4->getOptions()->getVAxis()->setMinValue(0);
		$Chart4->getOptions()->getVAxis()->setMaxValue(10);

		return $this->render('admin/index.html.twig', ['users' => $users, 'oldUsers' => $oldUsers, 'newUsers' => $newUsers, 'quizs' => $quizs, 'chart' => $Chart, 'quizChart' => $Chart_, 'quizLastWeek' => $Chart1, 'quizLastMonth'=>$Chart2, 'userLastMonth' => $Chart3, 'userLastWeek' => $Chart4]);
	}

	#[Route('/sendEmail', name: 'sendEmail', methods: ['POST'])]
	public function sendEmail(Request $request, \Swift_Mailer $mailer)
	{
		if ($request->get('type') == 'notLogged') {
			$message = (new \Swift_Message('Hey! Come back!'))->setFrom('my_quiz@epitech.eu')->setTo($request->get('user'))->setBody($this->renderView('emails/come_back.html.twig'), 'text/html');
			$mailer->send($message);
			$this->addFlash('success', 'Email Sent!');
			return $this->redirectToRoute('admin');
		} elseif ($request->get('type') == 'Logged') {
			$message = (new \Swift_Message('Do more!'))->setFrom('my_quiz@epitech.eu')->setTo($request->get('user'))->setBody($this->renderView('emails/do_more.html.twig'), 'text/html');
			$mailer->send($message);
			$this->addFlash('success', 'Email Sent!');
			return $this->redirectToRoute('admin');
		}
	}

	#[Route('/show/{id}', name: 'show', methods: ['GET'])]
	public function showAdmin($id)
	: Response
	{
		$user = $this->getDoctrine()->getRepository(User::class)->find($id);
		return $this->render('admin/show.html.twig', ['user' => $user,]);
	}

	#[Route('/edit/{id}', name: 'edit', methods: ['POST'])]
	public function editAdmin($id, Request $request)
	: Response
	{

		$entityManager = $this->getDoctrine()->getManager();
		$user = $this->getDoctrine()->getRepository(User::class)->find($id);
		$user->setPseudo($request->get('pseudo'));
		$user->setEmail($request->get('email'));
		$roles[] = $request->get('roles');
		$user->setRoles($roles);
		if ($request->get('activation_token') == '') {
			$user->setActivation_Token(null);
		} else {
			$user->setActivation_Token($request->get('activation_token'));
		}
		$entityManager->persist($user);
		$entityManager->flush();

		$this->addFlash('success', 'User Updated!');

		return $this->redirectToRoute('admin');
	}

	#[Route('/adminRegister', name: 'adminRegister')]
	public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder, \Swift_Mailer $mailer)
	{

		$user = new User();
		$form = $this->createForm(RegisterUserType::class, $user);
		$form->handleRequest($request);


		if ($form->isSubmitted() && $form->isValid()) {
			$user->setPassword($passwordEncoder->encodePassword($user, $form->get('password')->getData()));
			$user->setEmail($form->get('email')->getData());
			$user->setActivation_token(md5(uniqid()));

			$entityManager = $this->getDoctrine()->getManager();
			$entityManager->persist($user);
			$entityManager->flush();

			$token = $user->getActivation_token();

			$message = (new \Swift_Message('You has been registered!'))->setFrom('my_quiz@epitech.eu')->setTo($form->get('email')->getData())->setBody($this->renderView('emails/registration.html.twig', array('pseudo' => $form->get('pseudo')->getData(), 'token' => $token)), 'text/html');

			$mailer->send($message);

			$this->addFlash('success', 'User Created!');
			return $this->redirectToRoute('admin');
		}

		return $this->render('user/index.html.twig', ['controller_name' => 'UserController', 'form' => $form->createView()]);
	}

	#[Route('/delete/{id}', name: 'admin_delete', methods: ['GET'])]
	public function delete($id)
	: Response
	{
		$user = $this->getDoctrine()->getRepository(User::class)->find($id);
		$entityManager = $this->getDoctrine()->getManager();
		$entityManager->remove($user);
		$entityManager->flush();

		$this->addFlash('success', 'User Deleted!');
		return $this->redirectToRoute('admin');
	}

	#[Route('/stats/user', name: 'userStat', methods: ['POST'])]
	public function userStat(Request $request)
	: Response
	{
		$user_id = $request->get('user');
		$user = $this->getDoctrine()->getRepository(User::class)->find($user_id);
		$userHighestScore = $this->getDoctrine()->getRepository(UserQuiz::class)->userHighestScore($user_id);
		$userLowestScore = $this->getDoctrine()->getRepository(UserQuiz::class)->userLowestScore($user_id);
		$avgScore = $this->getDoctrine()->getRepository(UserQuiz::class)->avgScore($user_id);
		$numberOfQuiz = $this->getDoctrine()->getRepository(UserQuiz::class)->findByUserId($user_id);
		$lastTimeConnected = $user->getlast_time_connected();

		return $this->render('admin/userStats.html.twig', ['user' => $user, 'highestScore' => $userHighestScore[0] ?? null, 'lowestScore' => $userLowestScore[0] ?? null, 'avgScore' => $avgScore[0] ?? null, 'numberOfQuiz' => $numberOfQuiz ?? null, 'lastTimeConnected' => $lastTimeConnected ?? null]);
	}

	#[Route('/stats/quiz', name: 'quizStat', methods: ['POST'])]
	public function quizStat(Request $request)
	: Response
	{
		$quiz_id = $request->get('quiz');
		$repo = $this->getDoctrine()->getRepository(UserQuiz::class);
		$quiz = $this->getDoctrine()->getRepository(Quiz::class)->find($quiz_id);
		$quizHighestScore = $repo->quizHighestScore($quiz_id);
		$quizLowestScore = $repo->quizLowestScore($quiz_id);
		$numberOfQuizDone = $repo->findByQuizId($quiz_id);
		$creator = $quiz->getUser()->getPseudo();

		// Force l'initialisation de la classe user (Lazy loading)
		$this->getDoctrine()->getManager()->initializeObject($creator);

		return $this->render('admin/quizStats.html.twig', ['quiz' => $quiz, 'highestScore' => $quizHighestScore[0] ?? null, 'lowestScore' => $quizLowestScore[0] ?? null, 'numberQuizDone' => $numberOfQuizDone ?? null, 'creator' => $creator]);
	}
}



