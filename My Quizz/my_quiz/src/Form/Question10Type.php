<?php

namespace App\Form;

use App\Entity\Question;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\RadioType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class Question10Type extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('question1', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question1_reponse1', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question1_reponse2', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question1_reponse3', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question1_reponse_expected', ChoiceType::class, array(
                "mapped" => false,
                'choices'  => array(
                    '1' => '1',
                    '2' => '2',
                    '3' => '3',
                ),
                'multiple' => false,
                'expanded' => true,
                'required' => true
            ))

            ->add('question2', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question2_reponse1', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question2_reponse2', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question2_reponse3', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question2_reponse_expected', ChoiceType::class, array(
                "mapped" => false,
                'choices'  => array(
                    '1' => '1',
                    '2' => '2',
                    '3' => '3',
                ),
                'multiple' => false,
                'expanded' => true,
                'required' => true
            ))

            ->add('question3', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question3_reponse1', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question3_reponse2', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question3_reponse3', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question3_reponse_expected', ChoiceType::class, array(
                "mapped" => false,
                'choices'  => array(
                    '1' => '1',
                    '2' => '2',
                    '3' => '3',
                ),
                'multiple' => false,
                'expanded' => true,
                'required' => true
            ))

            ->add('question4', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question4_reponse1', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question4_reponse2', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question4_reponse3', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question4_reponse_expected', ChoiceType::class, array(
                "mapped" => false,
                'choices'  => array(
                    '1' => '1',
                    '2' => '2',
                    '3' => '3',
                ),
                'multiple' => false,
                'expanded' => true,
                'required' => true
            ))

            ->add('question5', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question5_reponse1', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question5_reponse2', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question5_reponse3', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question5_reponse_expected', ChoiceType::class, array(
                "mapped" => false,
                'choices'  => array(
                    '1' => '1',
                    '2' => '2',
                    '3' => '3',
                ),
                'multiple' => false,
                'expanded' => true,
                'required' => true
            ))

            ->add('question6', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question6_reponse1', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question6_reponse2', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question6_reponse3', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question6_reponse_expected', ChoiceType::class, array(
                "mapped" => false,
                'choices'  => array(
                    '1' => '1',
                    '2' => '2',
                    '3' => '3',
                ),
                'multiple' => false,
                'expanded' => true,
                'required' => true
            ))

            ->add('question7', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question7_reponse1', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question7_reponse2', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question7_reponse3', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question7_reponse_expected', ChoiceType::class, array(
                "mapped" => false,
                'choices'  => array(
                    '1' => '1',
                    '2' => '2',
                    '3' => '3',
                ),
                'multiple' => false,
                'expanded' => true,
                'required' => true
            ))

            ->add('question8', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question8_reponse1', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question8_reponse2', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question8_reponse3', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question8_reponse_expected', ChoiceType::class, array(
                "mapped" => false,
                'choices'  => array(
                    '1' => '1',
                    '2' => '2',
                    '3' => '3',
                ),
                'multiple' => false,
                'expanded' => true,
                'required' => true
            ))

            ->add('question9', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question9_reponse1', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question9_reponse2', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question9_reponse3', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question9_reponse_expected', ChoiceType::class, array(
                "mapped" => false,
                'choices'  => array(
                    '1' => '1',
                    '2' => '2',
                    '3' => '3',
                ),
                'multiple' => false,
                'expanded' => true,
                'required' => true
            ))

            ->add('question10', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question10_reponse1', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question10_reponse2', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question10_reponse3', TextType::class, array(
                "mapped" => false,
            ))
            ->add('question10_reponse_expected', ChoiceType::class, array(
                "mapped" => false,
                'choices'  => array(
                    '1' => '1',
                    '2' => '2',
                    '3' => '3',
                ),
                'multiple' => false,
                'expanded' => true,
                'required' => true
            ))
        ; 
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Question::class,
        ]);
    }
}
