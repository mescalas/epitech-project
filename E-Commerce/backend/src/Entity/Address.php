<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 */
class Address
{
    /**
     * @Groups({"user_address", "address_read"})
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"user_address", "address_read"})
     * @Assert\NotBlank
     * @ORM\Column(type="string", length=255)
     */
    private $fullname;

    /**
     * @Groups({"user_address", "address_read"})
     * @Assert\NotBlank
     * @ORM\Column(type="string", length=255)
     */
    private $address1;

    /**
     * @Groups({"user_address", "address_read"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $address2;

    /**
     * @Groups({"user_address", "address_read"})
     * @Assert\NotBlank
     * @ORM\Column(type="integer")
     */
    private $postcode;

    /**
     * @Groups({"user_address", "address_read"})
     * @Assert\NotBlank
     * @ORM\Column(type="string", length=255)
     */
    private $city;

    /**
     * @Groups({"user_address", "address_read"})
     * @Assert\NotBlank
     * @ORM\Column(type="string", length=255)
     */
    private $phone;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="addresses")
     * @ORM\JoinColumn(nullable=true, onDelete="CASCADE")
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFullname(): ?string
    {
        return $this->fullname;
    }

    public function setFullname( string $fullname ): self
    {
        $this->fullname = $fullname;

        return $this;
    }

    public function getAddress1(): ?string
    {
        return $this->address1;
    }

    public function setAddress1( string $address1 ): self
    {
        $this->address1 = $address1;

        return $this;
    }

    public function getAddress2(): ?string
    {
        return $this->address2;
    }

    public function setAddress2( string $address2 ): self
    {
        $this->address2 = $address2;

        return $this;
    }

    public function getPostcode(): ?int
    {
        return $this->postcode;
    }

    public function setPostcode( int $postcode ): self
    {
        $this->postcode = $postcode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity( string $city ): self
    {
        $this->city = $city;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone( string $phone ): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser( ?User $user ): self
    {
        $this->user = $user;

        return $this;
    }
}
