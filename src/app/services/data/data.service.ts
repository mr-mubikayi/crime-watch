import { Injectable } from '@angular/core';
import { Location } from '../../models/interfaces/location';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  public locations: Array<Location> = [
    {
      country: 'Cities',
      lat: -28.4541,
      lng: 26.7968,
      description: `Indonesia, officially the Republic of Indonesia, is a country in Southeast Asia and Oceania
                    between the Indian and Pacific oceans. It consists of over 17,000 islands, including Sumatra,
                    Java, Sulawesi, and parts of Borneo and New Guinea`,
      locations: [
        {
          name: 'Bloemfontein',
          lat: -29.1183,
          lng: 26.2249,
          description: `Jakarta, Indonesia's massive capital, sits on the northwest coast of the island of Java.
                        A historic mix of cultures – Javanese, Malay, Chinese, Arab, Indian and European – has
                        influenced its architecture, language and cuisine. The old town, Kota Tua, is home to Dutch
                        colonial buildings, Glodok (Jakarta’s Chinatown) and the old port of Sunda Kelapa, where
                        traditional wooden schooners dock.`
        },
        {
          name: 'Welkom',
          lat: -27.9761,
          lng: 26.7345,
          description: `Jakarta, Indonesia's massive capital, sits on the northwest coast of the island of Java.
                        A historic mix of cultures – Javanese, Malay, Chinese, Arab, Indian and European – has
                        influenced its architecture, language and cuisine. The old town, Kota Tua, is home to Dutch
                        colonial buildings, Glodok (Jakarta’s Chinatown) and the old port of Sunda Kelapa, where
                        traditional wooden schooners dock.`
        },
      ]
    },
    {
      country: 'Police Stations',
      lat: -27.9761,
      lng: 26.7345,
      description: `Malaysia is a Southeast Asian country occupying parts of the Malay Peninsula and the island of Borneo.
                    It's known for its beaches, rainforests and mix of Malay, Chinese, Indian and European cultural influences.
                    The capital, Kuala Lumpur, is home to colonial buildings, busy shopping districts such as Bukit Bintang and
                    skyscrapers such as the iconic, 451m-tall Petronas Twin Towers.`,
      locations: [
        {
          name: 'Welkom Central',
          lat: -27.9828,
          lng: 26.7349,
          description: `Capital city of Malaysia`
        },
        {
          name: 'Bronville',
          lat: -27.998,
          lng: 26.8174,
          description: `Selangor is a state on the west coast of Peninsular Malaysia, encircling the capital Kuala Lumpur. In the
                        state capital, Shah Alam, the Sultan Salahuddin Abdul Aziz Mosque has 4 soaring minarets and a huge blue
                        dome. To the northeast are the limestone Batu Caves, which house ornately decorated Hindu shrines. A large
                        golden statue of the Hindu god Lord Murugan stands at the entrance, and monkeys scamper about.`
        },
        {
          name: 'Thabong',
          lat: -27.9675,
          lng: 26.8057,
          description: `Malacca is a Malaysian state on the Malay Peninsula's southwest coast. The capital, Malacca City, has a
                        colonial past seen in its preserved town center, the site of 16th-century, Portuguese St. Paul’s Church.
                        It's also home to Christ Church, built by the Dutch in the 18th century. Next to Christ Church in Red
                        Square is the Stadthuys, the Dutch-era town hall now housing a museum of Malaccan history and ethnography.`
        },
        {
          name: 'Naudeville',
          lat: -27.9998,
          lng: 26.7245,
          description: `Penang is a state in northwest Malaysia comprising mainland Seberang Perai and Penang Island. On the island,
                        the state capital of George Town is home to landmarks such as colonial Fort Cornwallis, the ornate Chinese
                        clan house Khoo Kongsi and the Kapitan Keling Mosque, all testaments to centuries of foreign influence.
                        To the west, a funicular ascends Penang Hill, with its trails, flower gardens and panoramic views.`
        },
        {
          name: 'Johor',
          lat: -27.9997,
          lng: 26.6687,
          description: `Johor, a state in southern Malaysia linked to Singapore by causeways, is known for beaches and rainforest.
                        Desaru Beach has a strip of resorts, while Endau Rompin National Park's mountainous jungle shelters waterfalls
                        and wildlife like elephants. Capital Johor Bahru's diverse history is reflected in the Victorian-era Sultan
                        Abu Bakar State Mosque and Arulmigu Sri Rajakaliamman Glass Temple, a glittering Hindu shrine.`
        }
      ]
    },
  ];

  constructor() { }
}
