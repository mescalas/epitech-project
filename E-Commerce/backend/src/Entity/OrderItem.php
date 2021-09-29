<?php

namespace App\Entity;

use App\Repository\OrderItemRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\Json;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=OrderItemRepository::class)
 */
class OrderItem
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Assert\NotBlank
     * @ORM\Column(type="integer")
     */
    private $order_id;

    /**
     * @Assert\NotBlank
     * @var array
     * @ORM\Column(type="json")
     */
    private $products;

    /**
     * @Assert\NotBlank
     * @var array
     * @ORM\Column(type="json")
     */
    private $current_price;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private $current_discount = null;

    /**
     * @Assert\NotBlank
     * @ORM\Column(type="float")
     */
    private $shipping_price;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOrderId(): ?int
    {
        return $this->order_id;
    }

    public function setOrderId( int $order_id ): self
    {
        $this->order_id = $order_id;

        return $this;
    }

    public function getProducts(): ?array
    {
        return $this->products;
    }

    public function setProducts( array $products ): self
    {
        $this->products = $products;

        return $this;
    }

    public function getCurrentPrice(): ?array
    {
        return $this->current_price;
    }

    public function setCurrentPrice( array $current_price ): self
    {
        $this->current_price = $current_price;

        return $this;
    }

    public function getCurrentDiscount(): ?array
    {
        return $this->current_discount;
    }

    public function setCurrentDiscount( array $current_discount ): self
    {
        $this->current_discount = $current_discount;

        return $this;
    }

    public function getShippingPrice(): ?float
    {
        return $this->shipping_price;
    }

    public function setShippingPrice(float $shipping_price): self
    {
        $this->shipping_price = $shipping_price;

        return $this;
    }
}
