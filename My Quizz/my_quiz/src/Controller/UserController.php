<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\PseudoEditType;
use App\Form\EmailEditType;
use App\Form\RegisterUserType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

/**
 * Class UserController
 * @package App\Controller
 */
class UserController extends AbstractController
{
	/**
	 * @var Security
	 */
	private $security;

	public function __construct(Security $security)
	{
		$this->security = $security;
	}

	#[Route('/register', name: 'register')]
	public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder, \Swift_Mailer $mailer)
	{

		$entityManager = $this->getDoctrine()->getManager();
		$users = $entityManager->getRepository(User::class)->findAll();
		dump($users);


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
			return $this->redirectToRoute('login');
		}

		return $this->render('user/index.html.twig', ['controller_name' => 'UserController', 'form' => $form->createView()]);
	}

	/**
	 *
	 * @param AuthenticationUtils $authenticationUtils
	 * @return mixed
	 */

	#[Route('/login', name: 'login')]
	public function login(AuthenticationUtils $authenticationUtils)
	{
		$error = $authenticationUtils->getLastAuthenticationError();
		$lastUsername = $authenticationUtils->getLastUsername();


		return $this->render('security/login.html.twig', array('last_username' => $lastUsername, 'error' => $error,));
	}

	#[Route('/activation/{token}', name: 'activation')]
	public function activation($token)
	{
		$entityManager = $this->getDoctrine()->getManager();
		$user_ = $entityManager->getRepository(User::class)->findOneBy(['activation_token' => $token]);

		$user_->setActivation_token(null);
		$entityManager = $this->getDoctrine()->getManager();
		$entityManager->persist($user_);
		$entityManager->flush();

		// On retourne à l'accueil
		return $this->redirectToRoute('default');
	}

	#[Route('/profile', name: 'profile', methods: ['GET'])]
	public function show()
	: Response
	{
		$user = $this->security->getUser();
		return $this->render('user/show.html.twig', ['user' => $user,]);
	}

	#[Route('/pseudo_edit', name: 'pseudo_edit', methods: ['GET', 'POST'])]
	public function pseudo_edit(Request $request)
	: Response
	{
		$user = $this->security->getUser();
		$form = $this->createForm(PseudoEditType::class, $user);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$this->getDoctrine()->getManager()->flush();

			return $this->redirectToRoute('default');
		}

		return $this->render('user/edit_pseudo.html.twig', ['user' => $user, 'form' => $form->createView(),]);
	}

	#[Route('/email_edit', name: 'email_edit', methods: ['GET', 'POST'])]
	public function email_edit(Request $request, \Swift_Mailer $mailer)
	: Response
	{
		$user = $this->security->getUser();
		$form = $this->createForm(EmailEditType::class, $user);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$user->setActivation_token(md5(uniqid()));
			$this->getDoctrine()->getManager()->flush();

			$token = $user->getActivation_token();
			$pseudo = $user->getPseudo();

			$message = (new \Swift_Message('Confirm your new password!'))->setFrom('my_quiz@epitech.eu')->setTo($form->get('email')->getData())->setBody($this->renderView('emails/registration.html.twig', array('pseudo' => $pseudo, 'token' => $token)), 'text/html');

			$mailer->send($message);
			return $this->redirectToRoute('default');
		}

		return $this->render('user/edit_email.html.twig', ['user' => $user, 'form' => $form->createView(),]);
	}

	#[Route('delete/{id}', name: 'deleteUser', methods: ['POST'])]
	public function delete(Request $request, User $user)
	: Response
	{
		if ($this->isCsrfTokenValid('delete' . $user->getId(), $request->request->get('_token'))) {
			$entityManager = $this->getDoctrine()->getManager();
			$this->get('security.token_storage')->setToken(null);
			$entityManager->remove($user);
			$entityManager->flush();
		}

		return $this->redirectToRoute('default');
	}

	#[Route('/password_change_form', name: 'password_change_form', methods: ['GET'])]
	public function user_password_form()
	{
		return $this->render('user/password_form.html.twig');
	}

	#[Route('/password_change', name: 'password_change', methods: ['POST'])]
	public function change_user_password(Request $request, UserPasswordEncoderInterface $passwordEncoder)
	{
		$old_pwd = $request->get('old_password');
		$new_pwd = $request->get('new_password');
		$new_pwd_confirm = $request->get('new_password_confirm');
		$user = $this->security->getUser();
		$checkPass = $passwordEncoder->isPasswordValid($user, $old_pwd);
		if ($checkPass === true) {
			$user->setPassword($passwordEncoder->encodePassword($user, $new_pwd_confirm));
			$entityManager = $this->getDoctrine()->getManager();
			$entityManager->persist($user);
			$entityManager->flush();
			return $this->redirectToRoute('login');
		} else {
			$this->addFlash('error', 'The current password is incorrect.');
			return $this->redirectToRoute('password_change_form');
		}
	}
}

