<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Entity(repositoryClass=ProductRepository::class)
 */
class Product
{
    /**
     * @Groups({"product_read", "subcategory_read", "featured_product"})
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"product_read", "subcategory_read", "featured_product"})
     * @Assert\NotBlank
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @Groups({"product_read", "subcategory_read", "featured_product"})
     * @Assert\NotBlank
     * @ORM\Column(type="string", length=255)
     */
    private $brand;

    /**
     * @Groups({"product_read", "subcategory_read", "featured_product"})
     * @Assert\NotBlank
     * @ORM\Column(type="string", length=500)
     */
    private $description;

    /**
     * @Groups({"product_read", "subcategory_read"})
     * @Assert\NotBlank
     * @ORM\Column(type="array")
     */
    private $characteristic = [];

    /**
     * @Groups({"product_read", "subcategory_read", "featured_product"})
     * @Assert\NotBlank
     * @ORM\Column(type="float")
     */
    private $price;

    /**
     * @Groups({"product_read", "subcategory_read"})
     * @Assert\NotBlank
     * @ORM\Column(type="integer")
     */
    private $quantity;

    /**
     * @Groups({"product_read", "subcategory_read"})
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private $discount;

    /**
     * @Groups({"product_read", "subcategory_read"})
     * @ORM\Column(type="boolean", options={"default" : false})
     */
    private $featured;

    /**
     * @Groups({"product_read", "subcategory_read"})
     * @Assert\NotBlank
     * @ORM\Column(type="float")
     */
    private $weight;

    /**
     * @Groups({"product_read"})
     * @Assert\NotNull
     * @ORM\ManyToOne(targetEntity=SubCategory::class, inversedBy="products")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     */
    private $sub_category;

    /**
     * @Groups({"product_read", "subcategory_read"})
     * @ORM\Column(type="datetime_immutable")
     */
    private $created_at;

    /**
     * @Groups({"product_read", "subcategory_read"})
     * @ORM\Column(type="datetime_immutable")
     */
    private $updated_at;

    /**
     * @Groups({"product_read", "subcategory_read"})
     * @ORM\OneToMany(targetEntity=ProductImage::class, mappedBy="product")
     */
    private $productImages;

    /**
     * @Groups("product_read")
     * @ORM\OneToMany(targetEntity=Review::class, mappedBy="product")
     */
    private $reviews;

    public function __construct()
    {
        $this->productImages = new ArrayCollection();
        $this->reviews = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName( string $name ): self
    {
        $this->name = $name;

        return $this;
    }

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand( string $brand ): self
    {
        $this->brand = $brand;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription( string $description ): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCharacteristic(): ?array
    {
        return $this->characteristic;
    }

    public function setCharacteristic( array $characteristic ): self
    {
        $this->characteristic = $characteristic;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice( float $price ): self
    {
        $this->price = $price;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity( int $quantity ): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getSubCategory(): ?SubCategory
    {
        return $this->sub_category;
    }

    public function setSubCategory( ?SubCategory $sub_category ): self
    {
        $this->sub_category = $sub_category;

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

    public function getFeatured(): ?bool
    {
        return $this->featured;
    }

    public function setFeatured( bool $featured ): self
    {
        $this->featured = $featured;

        return $this;
    }

    public function getWeight(): ?float
    {
        return $this->weight;
    }

    public function setWeight( float $weight ): self
    {
        $this->weight = $weight;

        return $this;
    }

    public function getDiscount(): ?int
    {
        return $this->discount;
    }

    public function setDiscount( int $discount ): self
    {
        $this->discount = $discount;

        return $this;
    }

    /**
     * @return Collection|ProductImage[]
     */
    public function getProductImages(): Collection
    {
        return $this->productImages;
    }

    public function addProductImage( ProductImage $productImage ): self
    {
        if ( !$this->productImages->contains( $productImage ) )
        {
            $this->productImages[] = $productImage;
            $productImage->setProduct( $this );
        }

        return $this;
    }

    public function removeProductImage( ProductImage $productImage ): self
    {
        if ( $this->productImages->removeElement( $productImage ) )
        {
            // set the owning side to null (unless already changed)
            if ( $productImage->getProduct() === $this )
            {
                $productImage->setProduct( null );
            }
        }

        return $this;
    }

    /**
     * @return Collection|Review[]
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(Review $review): self
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews[] = $review;
            $review->setProduct($this);
        }

        return $this;
    }

    public function removeReview(Review $review): self
    {
        if ($this->reviews->removeElement($review)) {
            // set the owning side to null (unless already changed)
            if ($review->getProduct() === $this) {
                $review->setProduct(null);
            }
        }

        return $this;
    }
}
