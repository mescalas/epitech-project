<?php

namespace App\Repository;

use App\Entity\UserQuiz;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method UserQuiz|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserQuiz|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserQuiz[]    findAll()
 * @method UserQuiz[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserQuizRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserQuiz::class);
    }

    public function quizHighestScore($id)
    {
        $qb = $this->createQueryBuilder('uq')
        ->where('(uq.quiz) = :id')
        ->orderBy('uq.score', 'DESC')
        ->setParameters([
            'id' => $id
        ]);
        $query = $qb->getQuery()->setMaxResults(1);;
        return $query->execute();
    }

    public function quizLowestScore($id)
    {
        $qb = $this->createQueryBuilder('uq')
        ->where('(uq.quiz) = :id')
        ->orderBy('uq.score', 'ASC')
        ->setParameters([
            'id' => $id
        ]);
        $query = $qb->getQuery()->setMaxResults(1);;
        return $query->execute();
    }

    public function userHighestScore($id)
    {
        $qb = $this->createQueryBuilder('uq')
        ->where('(uq.user) = :id')
        ->orderBy('uq.score', 'DESC')
        ->setParameters([
            'id' => $id
        ]);
        $query = $qb->getQuery()->setMaxResults(1);;
        return $query->execute();
    }

    public function userLowestScore($id)
    {
        $qb = $this->createQueryBuilder('uq')
        ->where('(uq.user) = :id')
        ->orderBy('uq.score', 'ASC')
        ->setParameters([
            'id' => $id
        ]);
        $query = $qb->getQuery()->setMaxResults(1);;
        return $query->execute();
    }

    public function avgScore($id)
    {
        $qb = $this->createQueryBuilder('uq')
        ->select('avg(uq.score)')
        ->where('(uq.user) = :id')
        ->orderBy('uq.score', 'ASC')
        ->setParameters([
            'id' => $id
        ]);
        $query = $qb->getQuery()->setMaxResults(1);;
        return $query->execute();
    }

    public function checkIfQuizExist($quiz_id, $user_id) {
        $qb = $this->createQueryBuilder('uq')
        ->where('(uq.user) = :user')
        ->andWhere('(uq.quiz) = :quiz')
        ->setParameters([
            'user' => $user_id,
            'quiz' => $quiz_id
        ]);
        $query = $qb->getQuery();
        return $query->execute();
    }

    public function findByUserId($id) {
        $qb = $this->createQueryBuilder('uq')
        ->where('(uq.user) = :user')
        ->setParameters([
            'user' => $id,
        ]);
        $query = $qb->getQuery();
        return $query->execute();
    }

    public function findByQuizId($id) {
        $qb = $this->createQueryBuilder('uq')
        ->where('(uq.quiz) = :quiz')
        ->setParameters([
            'quiz' => $id,
        ]);
        $query = $qb->getQuery();
        return $query->execute();
    }

    // /**
    //  * @return UserQuiz[] Returns an array of UserQuiz objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }

    /*
    public function findOneBySomeField($value): ?UserQuiz
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
