<?php

namespace App\Controller;

use App\Entity\Address;
use App\Entity\Shipping;
use App\Repository\ShippingRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class ShippingController extends AbstractController

{

    public function setDataOnObject( array $data = null, object $object, array $image = null )
    {
        foreach ( $data as $key => $value )
        {
            if ( $key === "id" ) continue;
            
            $func = 'set' . ucfirst( $key );
            $object->$func( $value );
        }
    }

    public function createShipping(Request $request, ValidatorInterface $validator): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        if (!isset($data['city']) || !isset($data['price'])) {
            return $this->json( 'An error has occurred : data city and price needed', 500 );
        }

        $shipping = new Shipping;

        $this->setDataOnObject( $data, $shipping );

        $errors = $validator->validate( $shipping );
        if ( count( $errors ) > 0 )
        {
            return $this->json( $errors, 500 );
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist( $shipping );       
        $entityManager->flush();

        return $this->json( 'Shipping fee exception saved successfully' );
    }

    public function updateShipping(Request $request, ValidatorInterface $validator): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );
        $entityManager = $this->getDoctrine()->getManager();

        if (!isset($data['city']) && !isset($data['price']) || !isset($data['id'])) {
            return $this->json( 'An error has occurred : data id, city or price needed', 500 );
        }

        $shipping = $entityManager->getRepository( Shipping::class )->find( $data['id'] );
        if ( !$shipping )
        {
            return $this->json( 'No shipping found for id ' . $data['id'], 500 );
        }

        $this->setDataOnObject( $data, $shipping );

        $errors = $validator->validate( $shipping );
        if ( count( $errors ) > 0 )
        {
            return $this->json( $errors, 500 );
        }

        $entityManager->flush();

        return $this->json( 'Shipping fee exception updated successfully' );
    }

    public function deleteShipping( Request $request ): Response
    {
        $data = $request->getContent();
        $data = json_decode( $data, true );

        if(!isset($data['id'])) {
            return $this->json( 'An error has occurred : data id needed', 500 );
        }

        $entityManager = $this->getDoctrine()->getManager();

        foreach ( $data['id'] as $value )
        {
            $shipping = $entityManager->getRepository( Shipping::class )->find( $value );

            if ( !$shipping ) {
                return $this->json( 'An error has occurred : shipping(s) doesn\'t exist', 500 );
            }

            $entityManager->remove( $shipping );
            $entityManager->flush();
        }

        return $this->json( "Shipping(s) deleted successfully" );
    }

    public function checkShipping(Request $request, ShippingRepository $shippingRepository, HttpClientInterface $client): Response
    {
        $addressId = $request->query->get('id');
        $weight = $request->query->get('weight');

        if (!isset($addressId) || !isset($weight)) {
            return $this->json( 'An error has occurred : id and weight needed', 500 );
        }

        $entityManager = $this->getDoctrine()->getManager();

        $address = $entityManager->getRepository( Address::class )->find( $addressId );
        if ( !$address )
        {
            return $this->json( 'No address found for id ' . $addressId, 500 );
        }

        $shippingException = $shippingRepository->findBy(['city' => $address->getCity()]);

        if ($shippingException) {
            return $this->json( $shippingException[0]->getPrice(), 200 );
        }

        $data = [
            
            "rate_options"=> [
                "carrier_ids"=> [
                "se-736933"
                ]
            ],
            "shipment"=> [
                "ship_to"=> [
                    "name"=> "Amanda Miller",
                    "phone"=> "555-555-5555",
                    "address_line1"=> $address->getAddress1(),
                    "city_locality"=> $address->getCity(),
                    "postal_code"=> $address->getPostCode(),
                    "country_code"=> "FR",
                    "address_residential_indicator"=> "yes"
                ],
                "ship_from"=> [
                "name"=> "John Doe",
                "phone"=> "111-111-1111",
                "address_line1"=> "4009 Marathon Blvd",
                "address_line2"=> "Suite 300",
                "city_locality"=> "Austin",
                "state_province"=> "TX",
                "postal_code"=> "78756",
                "country_code"=> "US"
                ],
                "packages"=> [
                [
                    "weight"=> [
                    "value"=> $weight,
                    "unit"=> "kilogram"
                    ]
                ]
                ]
            ]
              
        ];

        $reponse = $client->request('POST', 'https://api.shipengine.com/v1/rates', [
            'headers' => ['API-Key' => 'TEST_aCfao0eTkGoSvxyQoj4emqQyuvPyT6WQnDmzDHqmLgA', 'Content-Type' => 'application/json'],
            'json' => $data
        ]);

        $resultArray = $reponse->toArray();
        $shippingRate = $resultArray['rate_response']['invalid_rates'];

        $result = [];

        for ($i=0; $i < 2; $i++) { 
            $result[] = $shippingRate[$i]['shipping_amount']['amount'];
        }

        return $this->json($result);
    }
}
