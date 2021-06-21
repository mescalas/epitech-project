<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="`user`")
 * @ORM\HasLifecycleCallbacks()
 * @UniqueEntity("email")
 * @UniqueEntity("pseudo")
 */
class User implements UserInterface
{
	/**
	 * @ORM\Id
	 * @ORM\GeneratedValue
	 * @ORM\Column(type="integer")
	 */
	private $id;

	/**
	 * @ORM\Column(type="string", length=180, unique=true)
	 * @Assert\NotBlank()
	 * @Assert\Email()
	 */

	private $email;
	/**
	 * @ORM\Column(type="json")
	 */
	private $roles = [];

	/**
	 * @var string The hashed password
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 * @Assert\Length(max=64)
	 */
	private $password;

	/**
	 * @var string The pseudo
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 * @Assert\Length(max=64)
	 */

	private $pseudo;
	/**
	 * @ORM\Column(type="string", length=50, nullable=true)
	 */
	private $activation_token;

	/**
	 * @ORM\Column(type="datetime")
	 */
	private $created_at;

	/**
	 * @ORM\Column(type="datetime")
	 */
	private $updated_at;

	/**
	 * @ORM\Column(type="datetime", nullable=true)
	 */
	private $last_time_connected;

	/**
	 * @ORM\OneToMany(targetEntity=UserQuiz::class, mappedBy="user")
	 */
	private $userQuizzes;

	/**
	 * @ORM\OneToMany(targetEntity=Quiz::class, mappedBy="user")
	 */
	private $quizzes;

	public function __construct()
	{
		$this->userQuizzes = new ArrayCollection();
		$this->quizzes = new ArrayCollection();
	}

	public function getId()
	: ?int
	{
		return $this->id;
	}

	public function getEmail()
	: ?string
	{
		return $this->email;
	}

	public function setEmail(string $email)
	: self
	{
		$this->email = $email;

		return $this;
	}

	/**
	 * A visual identifier that represents this user.
	 *
	 * @see UserInterface
	 */
	public function getUsername()
	: string
	{
		return (string)$this->email;
	}

	/**
	 * @see UserInterface
	 */
	public function getRoles()
	: array
	{
		$roles = $this->roles;
		// guarantee every user at least has ROLE_USER
		$roles[] = 'ROLE_USER';

		return array_unique($roles);
	}

	public function setRoles(array $roles)
	: self
	{
		$this->roles = $roles;

		return $this;
	}

	/**
	 * @see UserInterface
	 */
	public function getPassword()
	: string
	{
		return (string)$this->password;
	}

	public function setPassword(string $password)
	: self
	{
		$this->password = $password;

		return $this;
	}

	public function getPseudo()
	: ?string
	{
		return $this->pseudo;
	}

	public function setPseudo(string $pseudo)
	: self
	{
		$this->pseudo = $pseudo;

		return $this;
	}

	/**
	 * Returning a salt is only needed, if you are not using a modern
	 * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
	 *
	 * @see UserInterface
	 */
	public function getSalt()
	: ?string
	{
		return null;
	}

	/**
	 * @see UserInterface
	 */
	public function eraseCredentials()
	{
		// If you store any temporary, sensitive data on the user, clear it here
		// $this->plainPassword = null;
	}

	public function getActivation_token()
	: ?string
	{
		return $this->activation_token;
	}

	public function setActivation_token(?string $activation_token)
	: self
	{
		$this->activation_token = $activation_token;

		return $this;
	}

	public function getCreated_At()
	: ?\DateTimeInterface
	{
		return $this->created_at;
	}

	public function setCreated_At(\DateTimeInterface $created_at)
	: self
	{
		$this->created_at = $created_at;

		return $this;
	}

	public function getUpdated_At()
	: ?\DateTimeInterface
	{
		return $this->updated_at;
	}

	public function setUpdated_At(\DateTimeInterface $updated_at)
	: self
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

	public function getlast_time_connected()
	: ?\DateTimeInterface
	{
		return $this->last_time_connected;
	}

	public function setlast_time_connected(?\DateTimeInterface $last_time_connected)
	: self
	{
		$this->last_time_connected = $last_time_connected;

		return $this;
	}

	/**
	 * @return Collection|UserQuiz[]
	 */

	public function getUserQuizzes()
	: Collection
	{
		return $this->userQuizzes;
	}

	public function addUserQuiz(UserQuiz $userQuiz)
	: self
	{
		if (!$this->userQuizzes->contains($userQuiz)) {
			$this->userQuizzes[] = $userQuiz;
			$userQuiz->setUser($this);
		}

		return $this;
	}

	public function removeUserQuiz(UserQuiz $userQuiz)
	: self
	{
		if ($this->userQuizzes->removeElement($userQuiz)) {
			// set the owning side to null (unless already changed)
			if ($userQuiz->getUser() === $this) {
				$userQuiz->setUser(null);
			}
		}

		return $this;
	}

	/**
	 * @return Collection|Quiz[]
	 */
	public function getQuizzes()
	: Collection
	{
		return $this->quizzes;
	}

	public function addQuiz(Quiz $quiz)
	: self
	{
		if (!$this->quizzes->contains($quiz)) {
			$this->quizzes[] = $quiz;
			$quiz->setUser($this);
		}

		return $this;
	}

	public function removeQuiz(Quiz $quiz)
	: self
	{
		if ($this->quizzes->removeElement($quiz)) {
			// set the owning side to null (unless already changed)
			if ($quiz->getUser() === $this) {
				$quiz->setUser(null);
			}
		}

		return $this;
	}
}