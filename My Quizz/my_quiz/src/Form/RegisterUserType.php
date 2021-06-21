<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;


class RegisterUserType extends AbstractType
{
	public function buildForm(FormBuilderInterface $builder, array $options)
	{
		$builder->add('pseudo', TextType::class, array('label' => false, 'attr' => array(
			'placeholder' => 'Pseudo'
		)))
			->add('email', EmailType::class, array('label' => false, 'attr' => array(
				'placeholder' => 'Email'
			)))
			->add('password', RepeatedType::class, ['type' => PasswordType::class, 'first_options' => array('label' => false, 'attr' => array(
				'placeholder' => 'Password'
			)), 'second_options' => array('label' => false, 'attr' => array(
				'placeholder' => 'Confirm Password'
			))])
			->add('save', SubmitType::class, ['label' => 'Register']);
	}

	public function configureOptions(OptionsResolver $resolver)
	{
		$resolver->setDefaults(['data_class' => User::class,]);
	}
}
