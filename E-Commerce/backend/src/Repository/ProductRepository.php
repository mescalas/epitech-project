<?php

namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Product|null find($id, $lockMode = null, $lockVersion = null)
 * @method Product|null findOneBy(array $criteria, array $orderBy = null)
 * @method Product[]    findAll()
 * @method Product[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct( ManagerRegistry $registry )
    {
        parent::__construct( $registry, Product::class );
    }

    public function getFeatured(): array{
        $conn = $this->getEntityManager()->getConnection();
        $sql  = 'SELECT p.id, p.name, p.price, ip.image, p.discount FROM product p INNER JOIN product_image ip ON p.id = ip.product_id WHERE p.featured = 1 ORDER BY RAND() LIMIT 3';
        $stmt = $conn->prepare( $sql );
        $stmt->executeQuery();

        return $stmt->fetchAllAssociative();
    }

    public function filterProduct( $subCategory, $name, $minPrice, $maxPrice, $stock, $brand, $new, $discount )
    {
        $qb = $this->createQueryBuilder( 'p' );

        if ( $subCategory )
        {
            $qb->innerJoin( 'p.sub_category', 'sc' );
            $qb->andWhere( 'sc.id LIKE :subCategory' )
               ->setParameter( 'subCategory', $subCategory );
        }

        if ( $name )
        {
            $qb->andWhere( 'p.name LIKE :name' )
               ->setParameter( 'name', $name . "%" );
        }

        if ( $minPrice )
        {
            $qb->andWhere( 'p.price >= :minPrice' )
               ->setParameter( 'minPrice', $minPrice );
        }

        if ( $maxPrice )
        {
            $qb->andWhere( 'p.price <= :maxPrice' )
               ->setParameter( 'maxPrice', $maxPrice );
        }

        if ( $stock )
        {
            $qb->andWhere( 'p.quantity > 0' );
        }

        if($brand) {
            $qb->andWhere('p.brand IN (:brand)')
                ->setParameter('brand', $brand);
        }

        if ( $discount )
        {
            $qb->andWhere( 'p.discount > 0' );
        }

        if ( $new )
        {
            $qb->orderBy( 'p.created_at', 'DESC' );
        }

        $query = $qb->getQuery();

        return $query->execute();
    }

    // /**
    //  * @return Product[] Returns an array of Product objects
    //  */
    /*
    public function findByExampleField($value)
    {
    return $this->createQueryBuilder('p')
    ->andWhere('p.exampleField = :val')
    ->setParameter('val', $value)
    ->orderBy('p.id', 'ASC')
    ->setMaxResults(10)
    ->getQuery()
    ->getResult()
    ;
    }
     */

    /*
    public function findOneBySomeField($value): ?Product
    {
    return $this->createQueryBuilder('p')
    ->andWhere('p.exampleField = :val')
    ->setParameter('val', $value)
    ->getQuery()
    ->getOneOrNullResult()
    ;
    }
    */
}
