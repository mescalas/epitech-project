<?php

namespace App\Entity;

use App\Repository\PaymentMethodRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=PaymentMethodRepository::class)
 */
class PaymentMethod
{
    /**
     * @Groups({"user_payment", "payment_read"})
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"user_payment", "payment_read"})
     * @Assert\NotBlank
     * @ORM\Column(type="string", length=255)
     */
    private $fullname;

    /**
     * @Groups({"user_payment", "payment_read"})
     * @Assert\NotBlank
     * @Assert\Length(
     *      min = 16,
     *      max = 16,
     * )
     * @ORM\Column(type="bigint")
     */
    private $creditcardNumber;

    /**
     * @Groups({"user_payment", "payment_read"})
     * @Assert\NotBlank
     * @Assert\Length(
     * min = 7,
     * max = 7,
     * )
     * @ORM\Column(type="string", length=7)
     */
    private $creditcardExpiration;

    /**
     * @Assert\NotBlank
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="paymentMethods")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreditcardNumber(): ?int
    {
        return $this->creditcardNumber;
    }

    public function setCreditcardNumber( int $creditcardNumber ): self
    {
        $this->creditcardNumber = $creditcardNumber;

        return $this;
    }

    public function getCreditcardExpiration(): ?string
    {
        return $this->creditcardExpiration;
    }

    public function setCreditcardExpiration(string $creditcardExpiration): self
    {
        $this->creditcardExpiration = $creditcardExpiration;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getFullname(): ?string
    {
        return $this->fullname;
    }

    public function setFullname(string $fullname): self
    {
        $this->fullname = $fullname;

        return $this;
    }
}
