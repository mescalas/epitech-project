<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegisterUserType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Security;

class DefaultController extends AbstractController
{
	/**
	 * @var Security
	 */
	private $security;

	public function __construct(Security $security)
	{
		$this->security = $security;
	}

	#[Route('/', name: 'default')]
	public function index(Request $request, UserPasswordEncoderInterface $passwordEncoder)
	{
		$user = new User;
		$entityManager = $this->getDoctrine()->getManager();
		$user->setPseudo('admin');
		$user->setEmail('admin@admin.com');
		$password = $passwordEncoder->encodePassword($user, 'admin');
		$user->setPassword($password);
		$user->setRoles(['ROLE_ADMIN']);
		$entityManager->persist($user);
		
		return $this->render('default/index.html.twig');
	}
}



