<?php

namespace Core;

use PDO;
use PDOexception;

class ORM
{
	private $bdd;

	public function __construct()
	{
		try {
			$this->bdd = new PDO('mysql:host=localhost;dbname=cinema;charset=utf8', 'root', 'root');
		} catch (PDOexception$e) {
			die("Erreur : " . $e->getMessage());
		}
	}

	//return un id
	public function create($table, $fields)
	{
		$keys = implode(', ', array_keys($fields));
		$values = ':' . implode(', :', array_keys($fields));
		$request = $this->bdd->prepare("INSERT INTO {$table}({$keys}) VALUES ({$values})");
		if ($request->execute($fields)) {
			return $this->bdd->lastInsertId();
		} else {
			return false;
		}
	}

	//return un tableau
	public function read($table, $id, $relation = ['has one' => '', 'has many' => ''])
	{
		$query_ = "SELECT * FROM {$table}";
		$query_ .= " WHERE {$table}.id_{$table}={$id} LIMIT 1";

		$request_ = $this->bdd->prepare($query_);
		$request_->execute();
		$result_ = $request_->fetchAll(PDO::FETCH_ASSOC);
		if (empty($relation)) {
			$query = "SELECT * FROM {$table}";
		} else {
			$query = "SELECT * FROM {$table}";
			foreach ($relation as $key => $value) {
				if (isset($value['has one'])) {
					$query .= " INNER JOIN {$value['has one']} ON {$table}.id_{$value['has one']} = {$value['has one']}.id_{$value['has one']}";
				}
				if (isset($value['has many'])) {
					$query .= " INNER JOIN {$value['has many']} ON {$table}.id_{$table} = {$value['has many']}.id_{$table}";

				}
			}
			$query .= " WHERE {$table}.id_{$table}={$id}";
			$request = $this->bdd->prepare($query);
			$request->execute();
			$result = $request->fetchAll(PDO::FETCH_ASSOC);
			array_push($result_, $result);
		}

		return $result_;
	}

	//return un boolean
	public function update($table, $id, $fields)
	{
		foreach ($fields as $key => $value) {
			$set[] = $key . ' = :' . $key;
		}
		$set = implode(', ', $set);
		$query = "UPDATE {$table} SET {$set} WHERE id_{$table}={$id}";
		$request = $this->bdd->prepare($query);

		return $request->execute($fields);
	}

	//return un boolean
	public function delete($table, $id)
	{
		$request = $this->bdd->prepare("DELETE FROM {$table} WHERE id_{$table}={$id}");
		$request->execute();
	}

	//return un tableau
	public function find($table, $params, $relation = ['has one' => '', 'has many' => ''])
	{
		$query = "SELECT * FROM {$table} ";
		foreach ($relation as $key => $value) {
			if (isset($value['has one'])) {
				$query .= " INNER JOIN {$value['has one']} ON {$table}.id_{$value['has one']} = {$value['has one']}.id_{$value['has one']}";
			}
			if (isset($value['has many'])) {
				$query .= " INNER JOIN {$value['has many']} ON {$table}.id_{$table} = {$value['has many']}.id_{$table}";
			}
		}
		foreach ($params as $key => $value) {
			if ($value != "") {
				if ($key == 'ORDER BY') {
					$query .= " " . $key . " " . $table . "." . $table . '_' . $value;
				} else {
					$query .= " " . $key . " " . $value . " ";
				}
			}
		}
		$request = $this->bdd->prepare($query);
		$request->execute();
		$result = $request->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public function login($table, $params)
	{
		$query = "SELECT * FROM {$table} WHERE email = '{$params['email']}' AND password = '{$params['password']}'";
		$request = $this->bdd->prepare($query);
		$request->execute();
		$result = $request->fetchAll(PDO::FETCH_ASSOC);
		return $result;

	}
}

?>