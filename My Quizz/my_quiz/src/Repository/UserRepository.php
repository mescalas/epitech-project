<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
	public function __construct(ManagerRegistry $registry)
	{
		parent::__construct($registry, User::class);
	}

	public function lastTimeConnectedMore()
	{
		$qb = $this->createQueryBuilder('u')->where('(u.last_time_connected) <= :date')->setParameters(['date' => new \DateTime('- 10 minutes')]);
		$query = $qb->getQuery();
		return $query->execute();
	}

	public function lastTimeConnectedLess()
	{
		$qb = $this->createQueryBuilder('u')->where('(u.last_time_connected) >= :date')->setParameters(['date' => new \DateTime('- 10 minutes')]);
		$query = $qb->getQuery();
		return $query->execute();
	}

	/**
	 * Used to upgrade (rehash) the user's password automatically over time.
	 */
	public function upgradePassword(UserInterface $user, string $newEncodedPassword)
	: void
	{
		if (!$user instanceof User) {
			throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
		}

		$user->setPassword($newEncodedPassword);
		$this->_em->persist($user);
		$this->_em->flush();
	}

	public function UserPerDay()
	: array
	{
		$conn = $this->getEntityManager()->getConnection();

		$sql = '
            SELECT  DATE(created_at) Date, COUNT(DISTINCT id) Users
			FROM    user
			GROUP   BY  DATE(created_at)
            ';
		$stmt = $conn->prepare($sql);
		$stmt->execute();

		return $stmt->fetchAllAssociative();
	}

	public function UserLastWeek()
	: array
	{
		$conn = $this->getEntityManager()->getConnection();

		$sql = '
            SELECT  DATE(created_at) Date, COUNT(DISTINCT id) Users
			FROM    user
			WHERE created_at BETWEEN date_sub(now(),INTERVAL 1 WEEK) AND now()
			GROUP BY  DATE(created_at)
            ';
		$stmt = $conn->prepare($sql);
		$stmt->execute();

		return $stmt->fetchAllAssociative();
	}

	public function UserLastMonth()
	: array
	{
		$conn = $this->getEntityManager()->getConnection();

		$sql = '
           	SELECT  DATE(created_at) Date, COUNT(DISTINCT id) Users
			FROM    user
			WHERE created_at BETWEEN date_sub(now(),INTERVAL 1 MONTH) AND now()
			GROUP BY  DATE(created_at)
            ';
		$stmt = $conn->prepare($sql);
		$stmt->execute();

		return $stmt->fetchAllAssociative();
	}

	public function QuizPerDay()
	: array
	{
		$conn = $this->getEntityManager()->getConnection();

		$sql = 'SELECT DATE(completed) Date, COUNT(DISTINCT id) Quizs FROM user_quiz GROUP BY DATE(completed)';
		$stmt = $conn->prepare($sql);
		$stmt->execute();

		return $stmt->fetchAllAssociative();
	}

	public function QuizLastWeek():array {
		$conn = $this->getEntityManager()->getConnection();
		$sql = 'SELECT DATE(completed) Date, COUNT(DISTINCT id) Quizs FROM user_quiz WHERE completed BETWEEN date_sub(now(),INTERVAL 1 WEEK) AND now() GROUP BY DATE(completed)';
		$stmt = $conn->prepare($sql);
		$stmt->execute();

		return $stmt->fetchAllAssociative();
	}

	public function QuizLastMonth():array {
		$conn = $this->getEntityManager()->getConnection();
		$sql = 'SELECT DATE(completed) Date, COUNT(DISTINCT id) Quizs FROM user_quiz WHERE completed BETWEEN date_sub(now(),INTERVAL 1 MONTH) AND now() GROUP BY DATE(completed)';
		$stmt = $conn->prepare($sql);
		$stmt->execute();

		return $stmt->fetchAllAssociative();
	}
	// /**
	//  * @return User[] Returns an array of User objects
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
	*/

	/*
	public function findOneBySomeField($value): ?User
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
