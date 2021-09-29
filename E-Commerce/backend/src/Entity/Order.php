<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=OrderRepository::class)
 * @ORM\Table(name="`order`")
 * @ORM\HasLifecycleCallbacks()
 */
class Order
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Assert\NotBlank
     * @ORM\Column(type="string", length=255)
     */
    private $reference;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $user_id;

    /**
     * @Assert\NotBlank
     * @ORM\Column(type="integer")
     */
    private $address_id;

    /**
     * @Assert\NotBlank
     * @ORM\Column(type="string", length=255)
     */
    private $status;

    /**
     * @Groups({"product_read", "subcategory_read"})
     * @ORM\Column(type="datetime_immutable")
     */
    private $created_at;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    private $updated_at;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference( string $reference ): self
    {
        $this->reference = $reference;

        return $this;
    }

    public function getUserId(): ?string
    {
        return $this->user_id;
    }

    public function setUserId( ?string $user_id ): self
    {
        $this->user_id = $user_id;

        return $this;
    }

    public function getAddressId(): ?int
    {
        return $this->address_id;
    }

    public function setAddressId( int $address_id ): self
    {
        $this->address_id = $address_id;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus( string $status ): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt( \DateTimeImmutable$created_at ): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt( \DateTimeImmutable$updated_at ): self
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    /**
     * @ORM\PrePersist
     */
    public function setCreatedAtValue()
        : void
    {
        $this->created_at = new \DateTimeImmutable();
    }

    /**
     * @ORM\PrePersist
     */
    public function setUpdatedAtValue()
        : void
    {
        $this->updated_at = new \DateTimeImmutable();
    }

    /**
     * @ORM\PreFlush
     */
    public function setUpdatedAtValue2()
        : void
    {
        $this->updated_at = new \DateTimeImmutable();
    }
}
