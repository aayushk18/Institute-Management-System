
import React, { useState } from 'react';

const Syllabus = [
    {
        StudentClass: "5",
        syllabus: [
            {
                subject: "Mathematics",
                chapters: [
                    {
                        name: "Large Numbers",
                        brief: "Introduces reading, writing, and comparing numbers up to crores, including place value and number operations.",
                        pdf: "/pdfs/class5/math/ch1.pdf"
                    },
                    {
                        name: "Addition and Subtraction",
                        brief: "Covers addition and subtraction of large numbers with regrouping and real-life applications.",
                        pdf: "/pdfs/class5/math/ch2.pdf"
                    },
                    {
                        name: "Multiplication",
                        brief: "Explores multiplication of large numbers, properties, and word problems.",
                        pdf: "/pdfs/class5/math/ch3.pdf"
                    },
                    {
                        name: "Division",
                        brief: "Teaches division of large numbers, including long division and problem-solving.",
                        pdf: "/pdfs/class5/math/ch4.pdf"
                    },
                    {
                        name: "Factors and Multiples",
                        brief: "Introduces factors, multiples, HCF, LCM, and their applications in problem-solving.",
                        pdf: "/pdfs/class5/math/ch5.pdf"
                    },
                    {
                        name: "Fractions",
                        brief: "Covers types of fractions, operations with fractions, and their use in daily life.",
                        pdf: "/pdfs/class5/math/ch6.pdf"
                    },
                    {
                        name: "Decimals",
                        brief: "Explains decimal numbers, their operations, and conversion to fractions.",
                        pdf: "/pdfs/class5/math/ch7.pdf"
                    },
                    {
                        name: "Geometry: Shapes and Angles",
                        brief: "Introduces basic shapes, angles, and their properties with practical examples.",
                        pdf: "/pdfs/class5/math/ch8.pdf"
                    },
                    {
                        name: "Measurement: Length, Weight, and Capacity",
                        brief: "Teaches units of measurement and conversions for length, weight, and capacity.",
                        pdf: "/pdfs/class5/math/ch9.pdf"
                    },
                    {
                        name: "Time and Money",
                        brief: "Covers reading time, time conversions, and calculations involving money.",
                        pdf: "/pdfs/class5/math/ch10.pdf"
                    },
                    {
                        name: "Perimeter and Area",
                        brief: "Explains calculating perimeter and area of basic shapes like rectangles and squares.",
                        pdf: "/pdfs/class5/math/ch11.pdf"
                    },
                    {
                        name: "Data Handling",
                        brief: "Introduces data collection, organization, and representation using tables and graphs.",
                        pdf: "/pdfs/class5/math/ch12.pdf"
                    }
                ]
            },
            {
                subject: "English",
                chapters: [
                    {
                        name: "Nouns and Pronouns",
                        brief: "Explains types of nouns and pronouns with their usage in sentences.",
                        pdf: "/pdfs/class5/english/ch1.pdf"
                    },
                    {
                        name: "Verbs and Tenses",
                        brief: "Covers verbs, their forms, and tenses to describe actions accurately.",
                        pdf: "/pdfs/class5/english/ch2.pdf"
                    },
                    {
                        name: "Adjectives and Adverbs",
                        brief: "Teaches adjectives for describing nouns and adverbs for modifying verbs.",
                        pdf: "/pdfs/class5/english/ch3.pdf"
                    },
                    {
                        name: "Prepositions and Conjunctions",
                        brief: "Explores prepositions for relationships and conjunctions for connecting ideas.",
                        pdf: "/pdfs/class5/english/ch4.pdf"
                    },
                    {
                        name: "Sentences and Punctuation",
                        brief: "Introduces sentence types and punctuation rules for clear communication.",
                        pdf: "/pdfs/class5/english/ch5.pdf"
                    },
                    {
                        name: "Reading Comprehension",
                        brief: "Develops skills to understand and answer questions based on passages.",
                        pdf: "/pdfs/class5/english/ch6.pdf"
                    },
                    {
                        name: "Poetry: Understanding and Appreciation",
                        brief: "Explores poems, their themes, and literary devices for appreciation.",
                        pdf: "/pdfs/class5/english/ch7.pdf"
                    },
                    {
                        name: "Story Writing",
                        brief: "Teaches elements of storytelling and creative writing techniques.",
                        pdf: "/pdfs/class5/english/ch8.pdf"
                    },
                    {
                        name: "Letter Writing",
                        brief: "Covers formats for formal and informal letter writing.",
                        pdf: "/pdfs/class5/english/ch9.pdf"
                    },
                    {
                        name: "Grammar in Context",
                        brief: "Applies grammar rules in practical writing and speaking scenarios.",
                        pdf: "/pdfs/class5/english/ch10.pdf"
                    },
                    {
                        name: "Vocabulary Building",
                        brief: "Introduces new words, synonyms, and antonyms to enhance language skills.",
                        pdf: "/pdfs/class5/english/ch11.pdf"
                    },
                    {
                        name: "Spelling and Dictation",
                        brief: "Focuses on correct spelling and dictation to improve accuracy.",
                        pdf: "/pdfs/class5/english/ch12.pdf"
                    }
                ]
            },
            {
                subject: "Science",
                chapters: [
                    {
                        name: "Living and Non-Living Things",
                        brief: "Differentiates between living and non-living things based on characteristics.",
                        pdf: "/pdfs/class5/science/ch1.pdf"
                    },
                    {
                        name: "Plants: Structure and Functions",
                        brief: "Explores plant parts, their functions, and processes like photosynthesis.",
                        pdf: "/pdfs/class5/science/ch2.pdf"
                    },
                    {
                        name: "Animals: Habitats and Adaptations",
                        brief: "Studies animal habitats and adaptations for survival.",
                        pdf: "/pdfs/class5/science/ch3.pdf"
                    },
                    {
                        name: "Human Body: Organs and Systems",
                        brief: "Introduces major organs and systems like digestive and respiratory.",
                        pdf: "/pdfs/class5/science/ch4.pdf"
                    },
                    {
                        name: "Food and Nutrition",
                        brief: "Explains nutrients, balanced diets, and their importance for health.",
                        pdf: "/pdfs/class5/science/ch5.pdf"
                    },
                    {
                        name: "Matter and Its States",
                        brief: "Covers states of matter and their properties with examples.",
                        pdf: "/pdfs/class5/science/ch6.pdf"
                    },
                    {
                        name: "Force, Work, and Energy",
                        brief: "Introduces forces, work, and types of energy with practical applications.",
                        pdf: "/pdfs/class5/science/ch7.pdf"
                    },
                    {
                        name: "Light and Sound",
                        brief: "Explores properties of light and sound, including reflection and vibration.",
                        pdf: "/pdfs/class5/science/ch8.pdf"
                    },
                    {
                        name: "Air and Water",
                        brief: "Studies the composition and importance of air and water in life.",
                        pdf: "/pdfs/class5/science/ch9.pdf"
                    },
                    {
                        name: "Weather and Seasons",
                        brief: "Explains weather patterns, seasons, and their impact on life.",
                        pdf: "/pdfs/class5/science/ch10.pdf"
                    },
                    {
                        name: "Earth and Universe",
                        brief: "Introduces Earth’s structure, solar system, and celestial bodies.",
                        pdf: "/pdfs/class5/science/ch11.pdf"
                    },
                    {
                        name: "Environmental Conservation",
                        brief: "Teaches the importance of conserving natural resources and ecosystems.",
                        pdf: "/pdfs/class5/science/ch12.pdf"
                    }
                ]
            },
            {
                subject: "Social Studies",
                chapters: [
                    {
                        name: "Our Earth: Continents and Oceans",
                        brief: "Explores continents, oceans, and their geographical significance.",
                        pdf: "/pdfs/class5/socialstudies/ch1.pdf"
                    },
                    {
                        name: "Maps and Globes",
                        brief: "Teaches reading maps and globes, including symbols and directions.",
                        pdf: "/pdfs/class5/socialstudies/ch2.pdf"
                    },
                    {
                        name: "Weather and Climate",
                        brief: "Differentiates between weather and climate with examples.",
                        pdf: "/pdfs/class5/socialstudies/ch3.pdf"
                    },
                    {
                        name: "Natural Resources",
                        brief: "Covers types of natural resources and their sustainable use.",
                        pdf: "/pdfs/class5/socialstudies/ch4.pdf"
                    },
                    {
                        name: "Indian History: Early Civilizations",
                        brief: "Introduces ancient Indian civilizations like Harappa and Mohenjo-Daro.",
                        pdf: "/pdfs/class5/socialstudies/ch5.pdf"
                    },
                    {
                        name: "Freedom Struggle",
                        brief: "Explores key events and leaders of India’s freedom movement.",
                        pdf: "/pdfs/class5/socialstudies/ch6.pdf"
                    },
                    {
                        name: "Our Government",
                        brief: "Explains the structure and functions of the Indian government.",
                        pdf: "/pdfs/class5/socialstudies/ch7.pdf"
                    },
                    {
                        name: "Rights and Duties",
                        brief: "Teaches fundamental rights and duties of Indian citizens.",
                        pdf: "/pdfs/class5/socialstudies/ch8.pdf"
                    },
                    {
                        name: "Transport and Communication",
                        brief: "Covers modes of transport and communication systems.",
                        pdf: "/pdfs/class5/socialstudies/ch9.pdf"
                    },
                    {
                        name: "People and Their Occupations",
                        brief: "Explores various occupations and their roles in society.",
                        pdf: "/pdfs/class5/socialstudies/ch10.pdf"
                    },
                    {
                        name: "Festivals of India",
                        brief: "Introduces major Indian festivals and their cultural significance.",
                        pdf: "/pdfs/class5/socialstudies/ch11.pdf"
                    },
                    {
                        name: "Our Environment",
                        brief: "Teaches environmental protection and sustainable practices.",
                        pdf: "/pdfs/class5/socialstudies/ch12.pdf"
                    }
                ]
            },
            {
                subject: "Hindi",
                chapters: [
                    {
                        name: "Alphabet and Vowels",
                        brief: "Introduces Hindi varnmala, vowels, and their pronunciation.",
                        pdf: "/pdfs/class5/hindi/ch1.pdf"
                    },
                    {
                        name: "Words and Sentences",
                        brief: "Teaches formation of words and sentences in Hindi.",
                        pdf: "/pdfs/class5/hindi/ch2.pdf"
                    },
                    {
                        name: "Nouns",
                        brief: "Explains types of nouns (sangya) and their usage in Hindi.",
                        pdf: "/pdfs/class5/hindi/ch3.pdf"
                    },
                    {
                        name: "Pronouns",
                        brief: "Covers pronouns (sarvnaam) and their role in sentences.",
                        pdf: "/pdfs/class5/hindi/ch4.pdf"
                    },
                    {
                        name: "Adjectives",
                        brief: "Introduces adjectives (visheshan) to describe nouns.",
                        pdf: "/pdfs/class5/hindi/ch5.pdf"
                    },
                    {
                        name: "Verbs",
                        brief: "Teaches verbs (kriya) and their conjugation in Hindi.",
                        pdf: "/pdfs/class5/hindi/ch6.pdf"
                    },
                    {
                        name: "Punctuation",
                        brief: "Explains punctuation marks (viram chinh) in Hindi writing.",
                        pdf: "/pdfs/class5/hindi/ch7.pdf"
                    },
                    {
                        name: "Reading and Comprehension",
                        brief: "Develops skills to read and understand Hindi passages.",
                        pdf: "/pdfs/class5/hindi/ch8.pdf"
                    },
                    {
                        name: "Poetry",
                        brief: "Introduces Hindi poems and their themes for appreciation.",
                        pdf: "/pdfs/class5/hindi/ch9.pdf"
                    },
                    {
                        name: "Story Writing",
                        brief: "Teaches creative story writing in Hindi with structure.",
                        pdf: "/pdfs/class5/hindi/ch10.pdf"
                    },
                    {
                        name: "Letter Writing",
                        brief: "Covers formats for formal and informal letter writing in Hindi.",
                        pdf: "/pdfs/class5/hindi/ch11.pdf"
                    },
                    {
                        name: "Idioms and Proverbs",
                        brief: "Introduces common Hindi idioms (muhavare) and proverbs (lokoktiyaan).",
                        pdf: "/pdfs/class5/hindi/ch12.pdf"
                    }
                ]
            },
            {
                subject: "Computer Science",
                chapters: [
                    {
                        name: "Introduction to Computers",
                        brief: "Covers basics of computers and their evolution.",
                        pdf: "/pdfs/class6/computerscience/ch1.pdf"
                    },
                    {
                        name: "Computer Components and Hardware",
                        brief: "Explains hardware components like CPU, memory, and storage.",
                        pdf: "/pdfs/class6/computerscience/ch2.pdf"
                    },
                    {
                        name: "Operating Systems: Basics",
                        brief: "Introduces operating systems and their functions.",
                        pdf: "/pdfs/class6/computerscience/ch3.pdf"
                    },
                    {
                        name: "Introduction to MS Office",
                        brief: "Covers basics of MS Office tools like Word and Excel.",
                        pdf: "/pdfs/class6/computerscience/ch4.pdf"
                    },
                    {
                        name: "Word Processing: MS Word",
                        brief: "Teaches document creation and formatting in MS Word.",
                        pdf: "/pdfs/class6/computerscience/ch5.pdf"
                    },
                    {
                        name: "Spreadsheets: MS Excel",
                        brief: "Explains spreadsheet creation and basic functions in Excel.",
                        pdf: "/pdfs/class6/computerscience/ch6.pdf"
                    },
                    {
                        name: "Internet and Email Basics",
                        brief: "Covers internet usage and email communication.",
                        pdf: "/pdfs/class6/computerscience/ch7.pdf"
                    },
                    {
                        name: "Introduction to Coding: Scratch",
                        brief: "Introduces block-based coding using Scratch.",
                        pdf: "/pdfs/class6/computerscience/ch8.pdf"
                    },
                    {
                        name: "Cyber Safety and Ethics",
                        brief: "Teaches safe internet practices and digital ethics.",
                        pdf: "/pdfs/class6/computerscience/ch9.pdf"
                    },
                    {
                        name: "File Management",
                        brief: "Explains organizing and managing files on a computer.",
                        pdf: "/pdfs/class6/computerscience/ch10.pdf"
                    },
                    {
                        name: "Basic Troubleshooting",
                        brief: "Covers basic computer problem-solving techniques.",
                        pdf: "/pdfs/class6/computerscience/ch11.pdf"
                    }
                ]
            },
            {
                subject: "General Knowledge",
                chapters: [
                    {
                        name: "Current Affairs: National and International",
                        brief: "Covers recent national and global events.",
                        pdf: "/pdfs/class6/generalknowledge/ch1.pdf"
                    },
                    {
                        name: "Famous Personalities",
                        brief: "Introduces notable figures and their contributions.",
                        pdf: "/pdfs/class6/generalknowledge/ch2.pdf"
                    },
                    {
                        name: "Countries and Capitals",
                        brief: "Teaches countries, their capitals, and basic geography.",
                        pdf: "/pdfs/class6/generalknowledge/ch3.pdf"
                    },
                    {
                        name: "Books and Authors",
                        brief: "Explores famous books and their authors.",
                        pdf: "/pdfs/class6/generalknowledge/ch4.pdf"
                    },
                    {
                        name: "Sports and Awards",
                        brief: "Covers major sports events and awards.",
                        pdf: "/pdfs/class6/generalknowledge/ch5.pdf"
                    },
                    {
                        name: "Indian Culture and Heritage",
                        brief: "Introduces India’s cultural and historical heritage.",
                        pdf: "/pdfs/class6/generalknowledge/ch6.pdf"
                    },
                    {
                        name: "Science and Technology",
                        brief: "Explores recent advancements in science and technology.",
                        pdf: "/pdfs/class6/generalknowledge/ch7.pdf"
                    },
                    {
                        name: "Wildlife and Conservation",
                        brief: "Teaches about wildlife and conservation efforts.",
                        pdf: "/pdfs/class6/generalknowledge/ch8.pdf"
                    },
                    {
                        name: "Important Days and Events",
                        brief: "Covers significant dates and events globally.",
                        pdf: "/pdfs/class6/generalknowledge/ch9.pdf"
                    },
                    {
                        name: "General Science Facts",
                        brief: "Introduces interesting science facts for general knowledge.",
                        pdf: "/pdfs/class6/generalknowledge/ch10.pdf"
                    },
                    {
                        name: "Historical Monuments",
                        brief: "Explores famous historical monuments and their significance.",
                        pdf: "/pdfs/class6/generalknowledge/ch11.pdf"
                    }
                ]
            }
        ]
    },
    {
        StudentClass: "6",
        syllabus: [
            {
                subject: "Mathematics",
                chapters: [
                    {
                        name: "Knowing Our Numbers",
                        brief: "Covers large numbers, estimation, and Roman numerals.",
                        pdf: "/pdfs/class6/math/ch1.pdf"
                    },
                    {
                        name: "Whole Numbers",
                        brief: "Explores properties of whole numbers and basic operations.",
                        pdf: "/pdfs/class6/math/ch2.pdf"
                    },
                    {
                        name: "Playing with Numbers",
                        brief: "Teaches divisibility rules, HCF, and LCM applications.",
                        pdf: "/pdfs/class6/math/ch3.pdf"
                    },
                    {
                        name: "Basic Geometrical Ideas",
                        brief: "Introduces points, lines, angles, and basic shapes.",
                        pdf: "/pdfs/class6/math/ch4.pdf"
                    },
                    {
                        name: "Integers",
                        brief: "Covers integers, their representation, and operations.",
                        pdf: "/pdfs/class6/math/ch5.pdf"
                    },
                    {
                        name: "Fractions",
                        brief: "Explains types of fractions and their operations.",
                        pdf: "/pdfs/class6/math/ch6.pdf"
                    },
                    {
                        name: "Decimals",
                        brief: "Teaches decimal operations and conversions with fractions.",
                        pdf: "/pdfs/class6/math/ch7.pdf"
                    },
                    {
                        name: "Data Handling",
                        brief: "Covers data collection, pictographs, and bar graphs.",
                        pdf: "/pdfs/class6/math/ch8.pdf"
                    },
                    {
                        name: "Mensuration: Perimeter and Area",
                        brief: "Explains calculating perimeter and area of shapes.",
                        pdf: "/pdfs/class6/math/ch9.pdf"
                    },
                    {
                        name: "Algebra: Introduction",
                        brief: "Introduces variables, expressions, and basic equations.",
                        pdf: "/pdfs/class6/math/ch10.pdf"
                    },
                    {
                        name: "Ratio and Proportion",
                        brief: "Teaches ratios, proportions, and their applications.",
                        pdf: "/pdfs/class6/math/ch11.pdf"
                    },
                    {
                        name: "Symmetry",
                        brief: "Explores line and rotational symmetry in shapes.",
                        pdf: "/pdfs/class6/math/ch12.pdf"
                    },
                    {
                        name: "Practical Geometry",
                        brief: "Teaches construction of shapes using compass and ruler.",
                        pdf: "/pdfs/class6/math/ch13.pdf"
                    }
                ]
            },
            {
                subject: "English",
                chapters: [
                    {
                        name: "Parts of Speech: Revision",
                        brief: "Revises nouns, verbs, adjectives, and other parts of speech.",
                        pdf: "/pdfs/class6/english/ch1.pdf"
                    },
                    {
                        name: "Tenses: Present, Past, and Future",
                        brief: "Explains verb tenses and their usage in sentences.",
                        pdf: "/pdfs/class6/english/ch2.pdf"
                    },
                    {
                        name: "Active and Passive Voice",
                        brief: "Teaches active and passive voice for sentence construction.",
                        pdf: "/pdfs/class6/english/ch3.pdf"
                    },
                    {
                        name: "Direct and Indirect Speech",
                        brief: "Covers conversion between direct and indirect speech.",
                        pdf: "/pdfs/class6/english/ch4.pdf"
                    },
                    {
                        name: "Sentence Structure",
                        brief: "Explores types of sentences and their structures.",
                        pdf: "/pdfs/class6/english/ch5.pdf"
                    },
                    {
                        name: "Reading Comprehension",
                        brief: "Develops skills to understand and analyze passages.",
                        pdf: "/pdfs/class6/english/ch6.pdf"
                    },
                    {
                        name: "Poetry: Analysis and Appreciation",
                        brief: "Teaches analysis of poems and literary devices.",
                        pdf: "/pdfs/class6/english/ch7.pdf"
                    },
                    {
                        name: "Essay Writing",
                        brief: "Guides writing structured essays on various topics.",
                        pdf: "/pdfs/class6/english/ch8.pdf"
                    },
                    {
                        name: "Formal and Informal Letter Writing",
                        brief: "Covers formats for formal and informal letters.",
                        pdf: "/pdfs/class6/english/ch9.pdf"
                    },
                    {
                        name: "Diary Entry",
                        brief: "Teaches writing personal reflections in diary format.",
                        pdf: "/pdfs/class6/english/ch10.pdf"
                    },
                    {
                        name: "Vocabulary Enhancement",
                        brief: "Introduces new words, synonyms, and antonyms.",
                        pdf: "/pdfs/class6/english/ch11.pdf"
                    },
                    {
                        name: "Spelling and Grammar Practice",
                        brief: "Focuses on improving spelling and grammar accuracy.",
                        pdf: "/pdfs/class6/english/ch12.pdf"
                    }
                ]
            },
            {
                subject: "Science",
                chapters: [
                    {
                        name: "Food: Where Does It Come From?",
                        brief: "Explores sources of food and food chains.",
                        pdf: "/pdfs/class6/science/ch1.pdf"
                    },
                    {
                        name: "Components of Food",
                        brief: "Teaches nutrients and their roles in a balanced diet.",
                        pdf: "/pdfs/class6/science/ch2.pdf"
                    },
                    {
                        name: "Fibre to Fabric",
                        brief: "Covers natural and synthetic fibres and fabric production.",
                        pdf: "/pdfs/class6/science/ch3.pdf"
                    },
                    {
                        name: "Sorting Materials into Groups",
                        brief: "Explains classification of materials based on properties.",
                        pdf: "/pdfs/class6/science/ch4.pdf"
                    },
                    {
                        name: "Separation of Substances",
                        brief: "Teaches methods like filtration and distillation.",
                        pdf: "/pdfs/class6/science/ch5.pdf"
                    },
                    {
                        name: "Changes Around Us",
                        brief: "Explores reversible and irreversible changes.",
                        pdf: "/pdfs/class6/science/ch6.pdf"
                    },
                    {
                        name: "Living Organisms and Their Surroundings",
                        brief: "Studies habitats and adaptations of organisms.",
                        pdf: "/pdfs/class6/science/ch7.pdf"
                    },
                    {
                        name: "Motion and Measurement of Distances",
                        brief: "Covers types of motion and measurement units.",
                        pdf: "/pdfs/class6/science/ch8.pdf"
                    },
                    {
                        name: "Light, Shadows, and Reflections",
                        brief: "Explains properties of light, shadows, and reflections.",
                        pdf: "/pdfs/class6/science/ch9.pdf"
                    },
                    {
                        name: "Electricity and Circuits",
                        brief: "Introduces electric circuits and their components.",
                        pdf: "/pdfs/class6/science/ch10.pdf"
                    },
                    {
                        name: "Fun with Magnets",
                        brief: "Teaches properties of magnets and their applications.",
                        pdf: "/pdfs/class6/science/ch11.pdf"
                    },
                    {
                        name: "Water and Its Importance",
                        brief: "Explores water sources, uses, and conservation.",
                        pdf: "/pdfs/class6/science/ch12.pdf"
                    },
                    {
                        name: "Air Around Us",
                        brief: "Covers composition and importance of air.",
                        pdf: "/pdfs/class6/science/ch13.pdf"
                    }
                ]
            },
            {
                subject: "Social Studies",
                chapters: [
                    {
                        name: "The Earth in the Solar System",
                        brief: "Introduces the solar system and Earth’s place in it.",
                        pdf: "/pdfs/class6/socialstudies/ch1.pdf"
                    },
                    {
                        name: "Globe: Latitudes and Longitudes",
                        brief: "Teaches reading globes using latitudes and longitudes.",
                        pdf: "/pdfs/class6/socialstudies/ch2.pdf"
                    },
                    {
                        name: "Motions of the Earth",
                        brief: "Explains rotation and revolution of Earth.",
                        pdf: "/pdfs/class6/socialstudies/ch3.pdf"
                    },
                    {
                        name: "Maps",
                        brief: "Covers types of maps and their uses.",
                        pdf: "/pdfs/class6/socialstudies/ch4.pdf"
                    },
                    {
                        name: "Major Domains of the Earth",
                        brief: "Explores lithosphere, hydrosphere, and atmosphere.",
                        pdf: "/pdfs/class6/socialstudies/ch5.pdf"
                    },
                    {
                        name: "Ancient Civilizations: Indus Valley",
                        brief: "Studies the Indus Valley civilization and its features.",
                        pdf: "/pdfs/class6/socialstudies/ch6.pdf"
                    },
                    {
                        name: "The Vedic Period",
                        brief: "Introduces the Vedic age and its cultural significance.",
                        pdf: "/pdfs/class6/socialstudies/ch7.pdf"
                    },
                    {
                        name: "What is Government?",
                        brief: "Explains types and functions of government.",
                        pdf: "/pdfs/class6/socialstudies/ch8.pdf"
                    },
                    {
                        name: "Panchayati Raj",
                        brief: "Covers the structure of local self-government in India.",
                        pdf: "/pdfs/class6/socialstudies/ch9.pdf"
                    },
                    {
                        name: "Urban and Rural Life",
                        brief: "Compares lifestyles in urban and rural areas.",
                        pdf: "/pdfs/class6/socialstudies/ch10.pdf"
                    },
                    {
                        name: "Diversity and Discrimination",
                        brief: "Teaches about diversity and combating discrimination.",
                        pdf: "/pdfs/class6/socialstudies/ch11.pdf"
                    },
                    {
                        name: "Key Elements of a Democratic Government",
                        brief: "Explains principles of democracy and citizen roles.",
                        pdf: "/pdfs/class6/socialstudies/ch12.pdf"
                    }
                ]
            },
            {
                subject: "Hindi",
                chapters: [
                    {
                        name: "Varnmala aur Matra",
                        brief: "Covers Hindi alphabet and vowel signs with pronunciation.",
                        pdf: "/pdfs/class6/hindi/ch1.pdf"
                    },
                    {
                        name: "Shabd aur Vakya",
                        brief: "Teaches word formation and sentence construction in Hindi.",
                        pdf: "/pdfs/class6/hindi/ch2.pdf"
                    },
                    {
                        name: "Sangya",
                        brief: "Explains types of nouns and their usage in Hindi.",
                        pdf: "/pdfs/class6/hindi/ch3.pdf"
                    },
                    {
                        name: "Sarvnaam",
                        brief: "Covers pronouns and their application in sentences.",
                        pdf: "/pdfs/class6/hindi/ch4.pdf"
                    },
                    {
                        name: "Visheshan",
                        brief: "Introduces adjectives to describe nouns in Hindi.",
                        pdf: "/pdfs/class6/hindi/ch5.pdf"
                    },
                    {
                        name: "Kriya",
                        brief: "Teaches verbs and their conjugation in Hindi.",
                        pdf: "/pdfs/class6/hindi/ch6.pdf"
                    },
                    {
                        name: "Viram Chinh",
                        brief: "Explains punctuation marks for Hindi writing.",
                        pdf: "/pdfs/class6/hindi/ch7.pdf"
                    },
                    {
                        name: "Pathan aur Samajh",
                        brief: "Develops reading and comprehension skills for Hindi texts.",
                        pdf: "/pdfs/class6/hindi/ch8.pdf"
                    },
                    {
                        name: "Kavita: Arth aur Bhav",
                        brief: "Explores Hindi poems, their meaning, and emotions.",
                        pdf: "/pdfs/class6/hindi/ch9.pdf"
                    },
                    {
                        name: "Kahani Lekhan",
                        brief: "Guides writing creative stories in Hindi.",
                        pdf: "/pdfs/class6/hindi/ch10.pdf"
                    },
                    {
                        name: "Patr Lekhan: Formal aur Informal",
                        brief: "Teaches formats for formal and informal letters in Hindi.",
                        pdf: "/pdfs/class6/hindi/ch11.pdf"
                    },
                    {
                        name: "Muhavare aur Lokoktiyaan",
                        brief: "Introduces Hindi idioms and proverbs with meanings.",
                        pdf: "/pdfs/class6/hindi/ch12.pdf"
                    }
                ]
            },
            {
                subject: "Computer Science",
                chapters: [
                    {
                        name: "Introduction to Computers",
                        brief: "Covers basics of computers and their evolution.",
                        pdf: "/pdfs/class6/computerscience/ch1.pdf"
                    },
                    {
                        name: "Computer Components and Hardware",
                        brief: "Explains hardware components like CPU, memory, and storage.",
                        pdf: "/pdfs/class6/computerscience/ch2.pdf"
                    },
                    {
                        name: "Operating Systems: Basics",
                        brief: "Introduces operating systems and their functions.",
                        pdf: "/pdfs/class6/computerscience/ch3.pdf"
                    },
                    {
                        name: "Introduction to MS Office",
                        brief: "Covers basics of MS Office tools like Word and Excel.",
                        pdf: "/pdfs/class6/computerscience/ch4.pdf"
                    },
                    {
                        name: "Word Processing: MS Word",
                        brief: "Teaches document creation and formatting in MS Word.",
                        pdf: "/pdfs/class6/computerscience/ch5.pdf"
                    },
                    {
                        name: "Spreadsheets: MS Excel",
                        brief: "Explains spreadsheet creation and basic functions in Excel.",
                        pdf: "/pdfs/class6/computerscience/ch6.pdf"
                    },
                    {
                        name: "Internet and Email Basics",
                        brief: "Covers internet usage and email communication.",
                        pdf: "/pdfs/class6/computerscience/ch7.pdf"
                    },
                    {
                        name: "Introduction to Coding: Scratch",
                        brief: "Introduces block-based coding using Scratch.",
                        pdf: "/pdfs/class6/computerscience/ch8.pdf"
                    },
                    {
                        name: "Cyber Safety and Ethics",
                        brief: "Teaches safe internet practices and digital ethics.",
                        pdf: "/pdfs/class6/computerscience/ch9.pdf"
                    },
                    {
                        name: "File Management",
                        brief: "Explains organizing and managing files on a computer.",
                        pdf: "/pdfs/class6/computerscience/ch10.pdf"
                    },
                    {
                        name: "Basic Troubleshooting",
                        brief: "Covers basic computer problem-solving techniques.",
                        pdf: "/pdfs/class6/computerscience/ch11.pdf"
                    }
                ]
            },
            {
                subject: "General Knowledge",
                chapters: [
                    {
                        name: "Current Affairs: National and International",
                        brief: "Covers recent national and global events.",
                        pdf: "/pdfs/class6/generalknowledge/ch1.pdf"
                    },
                    {
                        name: "Famous Personalities",
                        brief: "Introduces notable figures and their contributions.",
                        pdf: "/pdfs/class6/generalknowledge/ch2.pdf"
                    },
                    {
                        name: "Countries and Capitals",
                        brief: "Teaches countries, their capitals, and basic geography.",
                        pdf: "/pdfs/class6/generalknowledge/ch3.pdf"
                    },
                    {
                        name: "Books and Authors",
                        brief: "Explores famous books and their authors.",
                        pdf: "/pdfs/class6/generalknowledge/ch4.pdf"
                    },
                    {
                        name: "Sports and Awards",
                        brief: "Covers major sports events and awards.",
                        pdf: "/pdfs/class6/generalknowledge/ch5.pdf"
                    },
                    {
                        name: "Indian Culture and Heritage",
                        brief: "Introduces India’s cultural and historical heritage.",
                        pdf: "/pdfs/class6/generalknowledge/ch6.pdf"
                    },
                    {
                        name: "Science and Technology",
                        brief: "Explores recent advancements in science and technology.",
                        pdf: "/pdfs/class6/generalknowledge/ch7.pdf"
                    },
                    {
                        name: "Wildlife and Conservation",
                        brief: "Teaches about wildlife and conservation efforts.",
                        pdf: "/pdfs/class6/generalknowledge/ch8.pdf"
                    },
                    {
                        name: "Important Days and Events",
                        brief: "Covers significant dates and events globally.",
                        pdf: "/pdfs/class6/generalknowledge/ch9.pdf"
                    },
                    {
                        name: "General Science Facts",
                        brief: "Introduces interesting science facts for general knowledge.",
                        pdf: "/pdfs/class6/generalknowledge/ch10.pdf"
                    },
                    {
                        name: "Historical Monuments",
                        brief: "Explores famous historical monuments and their significance.",
                        pdf: "/pdfs/class6/generalknowledge/ch11.pdf"
                    }
                ]
            }
        ]
    }
];


const AdminSubjectHome = () => {
    const [selectedClass, setSelectedClass] = useState('5');
    const [showSubjects, setShowSubjects] = useState(false);
    const [expandedSubject, setExpandedSubject] = useState(null);
    const [expandedChapter, setExpandedChapter] = useState(null);
    const [showEditChapterModal, setShowEditChapterModal] = useState(false);
    const [currentChapter, setCurrentChapter] = useState({ subject: '', index: -1, name: '', brief: '', pdf: '' });
    const [editChapterData, setEditChapterData] = useState({ name: '', brief: '', pdf: '' });
    const [syllabusData, setSyllabusData] = useState(Syllabus);
    const [error, setError] = useState('');

    const getSyllabusForClass = () => {
        const classData = syllabusData.find((item) => item.StudentClass === selectedClass);
        return classData ? classData.syllabus : [];
    };

    const handleShowSubjects = () => {
        setShowSubjects(true);
        setExpandedSubject(null);
        setExpandedChapter(null);
    };

    const toggleSubject = (subject) => {
        setExpandedSubject(expandedSubject === subject ? null : subject);
        setExpandedChapter(null);
    };

    const toggleChapter = (chapterIndex) => {
        setExpandedChapter(expandedChapter === chapterIndex ? null : chapterIndex);
    };

    const handleEditChapter = () => {
        if (!editChapterData.name.trim()) {
            setError('Chapter name cannot be empty');
            return;
        }
        if (
            getSyllabusForClass()
                .find((subj) => subj.subject === currentChapter.subject)
                .chapters.some((ch, idx) => idx !== currentChapter.index && ch.name === editChapterData.name)
        ) {
            setError('Chapter name already exists');
            return;
        }
        setSyllabusData((prev) =>
            prev.map((item) =>
                item.StudentClass === selectedClass
                    ? {
                        ...item,
                        syllabus: item.syllabus.map((subj) =>
                            subj.subject === currentChapter.subject
                                ? {
                                    ...subj,
                                    chapters: subj.chapters.map((ch, idx) =>
                                        idx === currentChapter.index ? editChapterData : ch
                                    )
                                }
                                : subj
                        )
                    }
                    : item
            )
        );
        alert('Chapter updated successfully');
        setEditChapterData({ name: '', brief: '', pdf: '' });
        setError('');
        setShowEditChapterModal(false);
    };

    return (
        <div className="container mx-auto p-10   min-h-screen relative">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Subject and Syllabus Management</h2>

            <div className='bg-white p-5 rounded-lg  border-t-1 shadow-md border-gray-200 border'>
                {/* Class Selector and Show Button */}
                <div className={`mb-6 flex items-center space-x-4 ${showEditChapterModal ? 'blur-md' : ''}`}>
                    <div className="flex items-center">
                        <label className="mr-3 text-lg font-medium text-gray-700">Select Class:</label>
                        <select
                            className="p-4   text-gray-600 rounded-sm  border-t-1 shadow-md border-gray-200 border bg-white  focus:outline-none "
                            value={selectedClass}
                            onChange={(e) => {
                                setSelectedClass(e.target.value);
                                setShowSubjects(false);
                                setExpandedSubject(null);
                                setExpandedChapter(null);
                            }}
                        >
                            <option value="5">Class 5</option>
                            <option value="6">Class 6</option>
                        </select>
                    </div>
                    <button
                        className="p-4 bg-gray-500 text-white rounded-sm hover:bg-gray-600  transition"
                        onClick={handleShowSubjects}
                    >
                        Show
                    </button>
                </div>

                {/* Subjects and Chapters Display */}
                {showSubjects && (
                    <div className={`bg-white rounded-lg transition  overflow-hidden ${showEditChapterModal ? 'blur-md' : ''}`}>
                        {getSyllabusForClass().length > 0 ? (
                            getSyllabusForClass().map((subject) => (

                                // selecting subject
                                <div key={subject.subject} className="mb-4 ">
                                    <div
                                        className=" group flex justify-between items-center hover:bg-gray-50 hover:text-white p-4 bg-white text-gray-600 rounded-md  border-t-1 shadow-md border-gray-200 border transition duration-100 cursor-pointer"
                                        onClick={() => toggleSubject(subject.subject)}
                                    >
                                        <h3 className="text-lg font-semibold   text-gray-800">{subject.subject}</h3>
                                        <span className="text-gray-600">
                                            {expandedSubject === subject.subject ? '▲' : '▼'}
                                        </span>
                                    </div>
                                    {expandedSubject === subject.subject && (
                                        <div className="p-4 mt-1  ">
                                            <ul className="space-y-2">
                                                {subject.chapters.map((chapter, index) => (
                                                    <li key={index} className="border-b border-gray-200">
                                                        <div className="flex justify-between items-center py-2">
                                                            <span
                                                                className="cursor-pointer text-gray-700 hover:text-blue-600"
                                                                onClick={() => toggleChapter(index)}
                                                            >
                                                                {chapter.name}
                                                            </span>
                                                            <button
                                                                className="bg-gray-500 text-white px-3 py-1 rounded-sm hover:bg-gray-600 transition"
                                                                onClick={() => {
                                                                    setCurrentChapter({ subject: subject.subject, index, ...chapter });
                                                                    setEditChapterData(chapter);
                                                                    setShowEditChapterModal(true);
                                                                    setError('');
                                                                }}
                                                            >
                                                                Edit
                                                            </button>
                                                        </div>
                                                        {expandedChapter === index && (
                                                            <div className="p-4 bg-gray-50 rounded-lg flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                                                                <div className="md:w-1/2">
                                                                    <h4 className="font-semibold text-gray-700 mb-2">Brief Description</h4>
                                                                    <p className="text-gray-600">{chapter.brief}</p>
                                                                </div>
                                                                <div className="md:w-1/2">
                                                                    <h4 className="font-semibold text-gray-700 mb-2">PDF Preview</h4>
                                                                    <div className="border rounded-lg p-4 bg-gray-200 h-64 flex items-center justify-center">
                                                                        <p className="text-gray-500">
                                                                            PDF Placeholder
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="p-4 text-gray-600">No subjects available for this class.</p>
                        )}
                    </div>
                )}

                {/* Edit Chapter Modal with Blurred Background */}
                {showEditChapterModal && (
                    <div className="fixed inset-0    bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">
                                Edit Chapter: {currentChapter.name}
                            </h3>
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 mb-1">Chapter Name</label>
                                    <input
                                        type="text"
                                        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={editChapterData.name}
                                        onChange={(e) => setEditChapterData({ ...editChapterData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">Brief Description</label>
                                    <textarea
                                        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="4"
                                        value={editChapterData.brief}
                                        onChange={(e) => setEditChapterData({ ...editChapterData, brief: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">PDF Link</label>
                                    <input
                                        type="text"
                                        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={editChapterData.pdf}
                                        onChange={(e) => setEditChapterData({ ...editChapterData, pdf: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between space-x-2 mt-6">
                                <button
                                    className="bg-gray-500 text-white px-4 py-2 rounded-sm hover:bg-gray-600 transition"
                                    onClick={() => setShowEditChapterModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-gray-500 text-white px-4 py-2 rounded-sm   hover:bg-gray-600 transition"
                                    onClick={handleEditChapter}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>


        </div>
    );
};

export default AdminSubjectHome;