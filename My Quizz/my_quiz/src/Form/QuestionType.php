<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class QuestionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('reponse', ChoiceType::class, [
            'choices'  => [
                $options['data'][0]->getReponse() => $options['data'][0]->getReponseExpected(),
                $options['data'][1]->getReponse() => $options['data'][1]->getReponseExpected(),
                $options['data'][2]->getReponse() => $options['data'][2]->getReponseExpected(),
            ]
        ])
        ->add('submit', SubmitType::class);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
