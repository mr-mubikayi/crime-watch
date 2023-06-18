import { Injectable } from '@angular/core';
import { Location } from '../../models/interfaces/location';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  public locations: Array<Location> = [
    {
      country: 'Bloemfontein',
      lat: -29.1183,
      lng: 26.2249,
      description: `Indonesia, officially the Republic of Indonesia, is a country in Southeast Asia and Oceania
                    between the Indian and Pacific oceans. It consists of over 17,000 islands, including Sumatra,
                    Java, Sulawesi, and parts of Borneo and New Guinea`,
      locations: [
        {
          name: 'Westdene',
          lat: -29.106101,
          lng: 26.208312,
          description: `Jakarta, Indonesia's massive capital, sits on the northwest coast of the island of Java.
                        A historic mix of cultures – Javanese, Malay, Chinese, Arab, Indian and European – has
                        influenced its architecture, language and cuisine. The old town, Kota Tua, is home to Dutch
                        colonial buildings, Glodok (Jakarta’s Chinatown) and the old port of Sunda Kelapa, where
                        traditional wooden schooners dock.`
        },
        {
          name: 'Willows',
          lat: -29.1219,
          lng: 26.2039,
          description: `Bandung, capital of Indonesia’s West Java province, is a large city set amid volcanoes and
                        tea plantations. It's known for colonial and art deco architecture, a lively, university-town
                        feel and – thanks to its 768m elevation – relatively cool tropical weather. Bandung is also a
                        shopping destination, with fashion outlets clustered along Jalan Setiabudi and Jalan Riau in
                        the Dago district.`
        },
        {
          name: 'Brandwag',
          lat: -29.1032,
          lng: 26.1965,
          description: `Yogyakarta (often called “Jogja”) is a city on the Indonesian island of Java known for its traditional
                        arts and cultural heritage. Its ornate 18th-century royal complex, or kraton, encompasses the still-inhabited
                        Sultan’s Palace. Also within the kraton are numerous open-air pavilions that host classical Javanese dance shows
                        and concerts of gamelan music, characterized by gongs, chimes and plucked string instruments.`
        },
        {
          name: 'Universitas',
          lat: -29.1173,
          lng: 26.1743,
          description: `Semarang is the capital and largest city of Central Java province in Indonesia. It was a major port during the
                        Dutch colonial era, and is still an important regional center and port today.`
        },
        {
          name: 'Bayswater',
          lat: -29.0821,
          lng: 26.2393,
          description: `Surabaya is a port city on the Indonesian island of Java. A vibrant, sprawling metropolis, it mixes modern
                        skyscrapers with canals and buildings from its Dutch colonial past. It has a thriving Chinatown and an Arab
                        Quarter whose Ampel Mosque dates to the 15th century. The Tugu Pahlawan (Heroes Monument) honors the independence
                        battles waged in Surabaya’s streets in 1945.`
        }
      ]
    },
    {
      country: 'Welkom',
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
