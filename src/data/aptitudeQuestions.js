// Comprehensive Aptitude Assessment Questions Dataset
// Covers Quantitative Aptitude, Logical Reasoning, Verbal Ability, and CS/Technical Fundamentals

export const APTITUDE_QUESTIONS = [
  // --- QUANTITATIVE APTITUDE ---
  {
    id: 1,
    category: "Quantitative Aptitude",
    difficulty: "Easy",
    question: "A train running at 72 km/h crosses a pole in 15 seconds. What is the length of the train?",
    options: ["250 meters", "300 meters", "350 meters", "400 meters"],
    correctAnswer: 1,
    explanation: "Speed in m/s = 72 * (5/18) = 20 m/s. Length of train = Speed * Time = 20 m/s * 15 s = 300 meters."
  },
  {
    id: 2,
    category: "Quantitative Aptitude",
    difficulty: "Medium",
    question: "If 12 men can complete a project in 18 days, in how many days can 9 men complete the same project working at the same pace?",
    options: ["20 days", "22 days", "24 days", "26 days"],
    correctAnswer: 2,
    explanation: "Using M1 * D1 = M2 * D2: 12 * 18 = 9 * D2 => 216 = 9 * D2 => D2 = 24 days."
  },
  {
    id: 3,
    category: "Quantitative Aptitude",
    difficulty: "Medium",
    question: "A shopkeeper marks an item at 25% above cost price and allows a 10% discount on the marked price. What is the overall profit percentage?",
    options: ["10.5%", "12.5%", "15.0%", "17.5%"],
    correctAnswer: 1,
    explanation: "Let CP = 100. MP = 125. SP = 125 - 10% of 125 = 125 - 12.5 = 112.5. Profit% = ((112.5 - 100) / 100) * 100 = 12.5%."
  },
  {
    id: 4,
    category: "Quantitative Aptitude",
    difficulty: "Hard",
    question: "What is the probability of getting a sum of 9 when two fair 6-sided dice are rolled simultaneously?",
    options: ["1/6", "1/8", "1/9", "5/36"],
    correctAnswer: 2,
    explanation: "Pairs summing to 9: (3,6), (4,5), (5,4), (6,3) = 4 outcomes out of 36 total outcomes. Probability = 4/36 = 1/9."
  },
  {
    id: 5,
    category: "Quantitative Aptitude",
    difficulty: "Easy",
    question: "What is 15% of 60% of 500?",
    options: ["40", "45", "50", "60"],
    correctAnswer: 1,
    explanation: "60% of 500 = 300. 15% of 300 = 0.15 * 300 = 45."
  },
  {
    id: 6,
    category: "Quantitative Aptitude",
    difficulty: "Medium",
    question: "The ratio of the ages of A and B is 3:5. After 5 years, the ratio becomes 2:3. What is the current age of A?",
    options: ["12 years", "15 years", "18 years", "21 years"],
    correctAnswer: 1,
    explanation: "Let ages be 3x and 5x. (3x + 5)/(5x + 5) = 2/3 => 3(3x + 5) = 2(5x + 5) => 9x + 15 = 10x + 10 => x = 5. Current age of A = 3 * 5 = 15 years."
  },
  {
    id: 7,
    category: "Quantitative Aptitude",
    difficulty: "Medium",
    question: "A sum of ₹10,000 is invested at 10% per annum compound interest for 2 years compounded annually. What is the compound interest earned?",
    options: ["₹2,000", "₹2,100", "₹2,200", "₹2,500"],
    correctAnswer: 1,
    explanation: "Amount = P * (1 + r/100)^t = 10000 * (1.1)^2 = 10000 * 1.21 = ₹12,100. CI = ₹12,100 - ₹10,000 = ₹2,100."
  },
  {
    id: 8,
    category: "Quantitative Aptitude",
    difficulty: "Hard",
    question: "Pipe A can fill a tank in 6 hours, while Pipe B can empty it in 8 hours. If both pipes are opened together, how long will it take to fill the tank?",
    options: ["14 hours", "18 hours", "24 hours", "28 hours"],
    correctAnswer: 2,
    explanation: "Net rate per hour = (1/6) - (1/8) = (4 - 3)/24 = 1/24 tank per hour. Total time = 24 hours."
  },
  {
    id: 9,
    category: "Quantitative Aptitude",
    difficulty: "Easy",
    question: "Find the average of the first 5 prime numbers.",
    options: ["5.2", "5.6", "6.0", "6.8"],
    correctAnswer: 1,
    explanation: "First 5 primes are 2, 3, 5, 7, 11. Sum = 28. Average = 28 / 5 = 5.6."
  },
  {
    id: 10,
    category: "Quantitative Aptitude",
    difficulty: "Medium",
    question: "A boat covers 24 km downstream in 2 hours and 16 km upstream in 2 hours. What is the speed of the boat in still water?",
    options: ["8 km/h", "10 km/h", "12 km/h", "14 km/h"],
    correctAnswer: 1,
    explanation: "Downstream speed = 24/2 = 12 km/h. Upstream speed = 16/2 = 8 km/h. Speed in still water = (Downstream + Upstream) / 2 = (12 + 8) / 2 = 10 km/h."
  },
  {
    id: 11,
    category: "Quantitative Aptitude",
    difficulty: "Easy",
    question: "The HCF and LCM of two numbers are 12 and 240 respectively. If one of the numbers is 48, what is the other number?",
    options: ["50", "60", "72", "80"],
    correctAnswer: 1,
    explanation: "Product of numbers = HCF * LCM => 48 * x = 12 * 240 => 48 * x = 2880 => x = 60."
  },
  {
    id: 12,
    category: "Quantitative Aptitude",
    difficulty: "Medium",
    question: "In how many different ways can the letters of the word 'LEADER' be arranged?",
    options: ["180", "360", "720", "1440"],
    correctAnswer: 1,
    explanation: "Total letters = 6 (with 'E' repeating 2 times). Number of ways = 6! / 2! = 720 / 2 = 360."
  },
  {
    id: 13,
    category: "Quantitative Aptitude",
    difficulty: "Hard",
    question: "A man covers 1/3rd of his journey at 20 km/h, 1/3rd at 30 km/h, and the remaining 1/3rd at 60 km/h. What is his average speed for the entire journey?",
    options: ["30 km/h", "32 km/h", "36 km/h", "40 km/h"],
    correctAnswer: 0,
    explanation: "Let total distance be 180 km. Each 1/3rd is 60 km. Time 1 = 60/20 = 3h, Time 2 = 60/30 = 2h, Time 3 = 60/60 = 1h. Total time = 6h. Average speed = 180 / 6 = 30 km/h."
  },
  {
    id: 14,
    category: "Quantitative Aptitude",
    difficulty: "Easy",
    question: "What is the value of (256)^0.16 * (256)^0.09?",
    options: ["2", "4", "8", "16"],
    correctAnswer: 1,
    explanation: "(256)^(0.16 + 0.09) = (256)^0.25 = (256)^(1/4) = 4."
  },

  // --- LOGICAL REASONING ---
  {
    id: 15,
    category: "Logical Reasoning",
    difficulty: "Easy",
    question: "Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?",
    options: ["10", "12", "13", "14"],
    correctAnswer: 0,
    explanation: "This is an alternating addition and subtraction series: +3, -2, +3, -2, +3, -2. 12 - 2 = 10."
  },
  {
    id: 16,
    category: "Logical Reasoning",
    difficulty: "Medium",
    question: "Pointing to a photograph, Priya said, 'He is the son of the only daughter of the father of my brother.' How is Priya related to the boy?",
    options: ["Sister", "Aunt", "Mother", "Grandmother"],
    correctAnswer: 2,
    explanation: "Father of my brother = Priya's father. Only daughter of Priya's father = Priya herself. Son of Priya = her son. Therefore, Priya is his mother."
  },
  {
    id: 17,
    category: "Logical Reasoning",
    difficulty: "Medium",
    question: "In a certain code, COMPUTER is written as RFUVQNPC. How is MEDICINE written in that same code?",
    options: ["EOJDEJFM", "EOJDJEFM", "MFEDJJOE", "MFEJDJOE"],
    correctAnswer: 1,
    explanation: "The first and last letters are swapped and written backwards with letters shifted by +1: M->E, E->N, etc. 'MEDICINE' becomes EOJDJEFM."
  },
  {
    id: 18,
    category: "Logical Reasoning",
    difficulty: "Hard",
    question: "Statements: All mangoes are golden. No golden things are cheap. Conclusions: I. All mangoes are cheap. II. Golden things are not mangoes. III. Mangoes are not cheap.",
    options: ["Only I follows", "Only II follows", "Only III follows", "Both II and III follow"],
    correctAnswer: 2,
    explanation: "All mangoes belong to golden things, and no golden things are cheap; therefore, no mangoes are cheap (Conclusion III follows). Conclusion II is invalid because mangoes are indeed golden."
  },
  {
    id: 19,
    category: "Logical Reasoning",
    difficulty: "Easy",
    question: "Which of the following does NOT belong in the group: Apple, Banana, Guava, Carrot?",
    options: ["Apple", "Banana", "Guava", "Carrot"],
    correctAnswer: 3,
    explanation: "Carrot is a root vegetable, whereas Apple, Banana, and Guava are fruits."
  },
  {
    id: 20,
    category: "Logical Reasoning",
    difficulty: "Medium",
    question: "A man walks 5 km North, turns right and walks 3 km, then turns right again and walks 5 km. In which direction is he from the starting point?",
    options: ["North", "South", "East", "West"],
    correctAnswer: 2,
    explanation: "Walking 5 km North and 5 km South cancel out the vertical displacement. He is 3 km directly East of his starting position."
  },
  {
    id: 21,
    category: "Logical Reasoning",
    difficulty: "Medium",
    question: "Complete the analogical pair: LIGHT : DARK :: TRANSPARENT : ?",
    options: ["Brilliant", "Opaque", "Vivid", "Glass"],
    correctAnswer: 1,
    explanation: "Light and Dark are direct antonyms. The antonym of Transparent is Opaque."
  },
  {
    id: 22,
    category: "Logical Reasoning",
    difficulty: "Hard",
    question: "Six friends A, B, C, D, E, and F are sitting around a circular table facing the center. A is opposite to D. B is to the immediate right of A. E is opposite to B. Who is sitting to the immediate left of A?",
    options: ["C", "D", "E", "F"],
    correctAnswer: 3,
    explanation: "Facing center: right of A is B. Opposite to A is D. Opposite to B is E. The remaining positions on the circle leave F to the left of A."
  },
  {
    id: 23,
    category: "Logical Reasoning",
    difficulty: "Easy",
    question: "Find the missing number in the sequence: 4, 9, 16, 25, 36, ?",
    options: ["42", "48", "49", "54"],
    correctAnswer: 2,
    explanation: "This is a series of consecutive squares: 2^2, 3^2, 4^2, 5^2, 6^2, 7^2 = 49."
  },
  {
    id: 24,
    category: "Logical Reasoning",
    difficulty: "Medium",
    question: "If 'P + Q' means P is the mother of Q; 'P - Q' means P is the brother of Q; 'P * Q' means P is the father of Q. Which represents that M is the uncle of N?",
    options: ["M - K * N", "M + K * N", "M * K - N", "N - K * M"],
    correctAnswer: 0,
    explanation: "M - K means M is brother of K. K * N means K is father of N. Brother of father is uncle; thus M is the uncle of N."
  },
  {
    id: 25,
    category: "Logical Reasoning",
    difficulty: "Hard",
    question: "At what angle are the hands of a clock inclined at 3:40?",
    options: ["120 degrees", "125 degrees", "130 degrees", "140 degrees"],
    correctAnswer: 2,
    explanation: "Angle = |30*H - (11/2)*M| = |30*3 - (11/2)*40| = |90 - 220| = |-130| = 130 degrees."
  },
  {
    id: 26,
    category: "Logical Reasoning",
    difficulty: "Easy",
    question: "If SOUTH-EAST becomes NORTH, NORTH-EAST becomes WEST, and so on, what will WEST become?",
    options: ["North-East", "South-East", "North-West", "South-West"],
    correctAnswer: 1,
    explanation: "Each direction rotates 135 degrees clockwise. West rotated 135 degrees clockwise becomes South-East."
  },
  {
    id: 27,
    category: "Logical Reasoning",
    difficulty: "Medium",
    question: "Find the odd number out: 27, 64, 125, 144, 216, 343.",
    options: ["64", "125", "144", "216"],
    correctAnswer: 2,
    explanation: "All numbers are perfect cubes except 144 (which is 12^2, whereas others are 3^3, 4^3, 5^3, 6^3, 7^3)."
  },

  // --- VERBAL & COMMUNICATION ---
  {
    id: 28,
    category: "Verbal Ability",
    difficulty: "Easy",
    question: "Choose the word most nearly opposite in meaning (Antonym) to: 'CANDID'",
    options: ["Frank", "Guarded", "Honest", "Sincere"],
    correctAnswer: 1,
    explanation: "'Candid' means truthful, straightforward, and unreserved. 'Guarded' means cautious and reserved, which is its antonym."
  },
  {
    id: 29,
    category: "Verbal Ability",
    difficulty: "Medium",
    question: "Select the correctly punctuated sentence.",
    options: [
      "The engineering team completed the project on time, however they had to work overtime.",
      "The engineering team completed the project on time; however, they had to work overtime.",
      "The engineering team completed the project on time however, they had to work overtime.",
      "The engineering team completed the project on time, however, they had to work overtime."
    ],
    correctAnswer: 1,
    explanation: "When connecting two independent clauses with a conjunctive adverb like 'however', use a semicolon before and a comma after."
  },
  {
    id: 30,
    category: "Verbal Ability",
    difficulty: "Easy",
    question: "Choose the word most nearly similar in meaning (Synonym) to: 'PRAGMATIC'",
    options: ["Idealistic", "Practical", "Theoretical", "Fanciful"],
    correctAnswer: 1,
    explanation: "'Pragmatic' refers to dealing with things sensibly and realistically based on practical rather than theoretical considerations."
  },
  {
    id: 31,
    category: "Verbal Ability",
    difficulty: "Medium",
    question: "Fill in the blank: 'Neither of the candidates _____ submitted their portfolio credentials yet.'",
    options: ["have", "has", "are", "were"],
    correctAnswer: 1,
    explanation: "'Neither' when used as a singular pronoun takes a singular verb, so 'has' is grammatically correct."
  },
  {
    id: 32,
    category: "Verbal Ability",
    difficulty: "Hard",
    question: "Identify the error in the sentence: 'The committee have decided to postpone the internship drive until further notice.'",
    options: ["The committee", "have decided", "to postpone", "further notice"],
    correctAnswer: 1,
    explanation: "In standard formal English, 'committee' acts as a single collective noun, requiring the singular verb 'has decided'."
  },
  {
    id: 33,
    category: "Verbal Ability",
    difficulty: "Medium",
    question: "Choose the correct idiom meaning for: 'To hit the nail on the head'",
    options: ["To cause accidental harm", "To state something with exact precision", "To build something strong", "To work persistently"],
    correctAnswer: 1,
    explanation: "'To hit the nail on the head' means to describe or identify the exact reason or truth behind something."
  },
  {
    id: 34,
    category: "Verbal Ability",
    difficulty: "Easy",
    question: "Select the correctly spelled word:",
    options: ["Accomodation", "Accommodation", "Acommodation", "Accomadation"],
    correctAnswer: 1,
    explanation: "The correct spelling is 'Accommodation' with double 'c' and double 'm'."
  },
  {
    id: 35,
    category: "Verbal Ability",
    difficulty: "Medium",
    question: "What does the Latin phrase 'Status Quo' mean?",
    options: ["The existing state of affairs", "A great masterpiece", "A diplomatic mistake", "In good faith"],
    correctAnswer: 0,
    explanation: "'Status Quo' refers to the existing state of affairs or current conditions, especially regarding social or political issues."
  },
  {
    id: 36,
    category: "Verbal Ability",
    difficulty: "Hard",
    question: "Rearrange into a coherent sentence: P: 'with remarkable accuracy', Q: 'the automated algorithm', R: 'predicted user intent', S: 'in real-time'.",
    options: ["Q-R-P-S", "R-Q-P-S", "Q-S-P-R", "S-P-Q-R"],
    correctAnswer: 0,
    explanation: "Q: 'the automated algorithm' + R: 'predicted user intent' + P: 'with remarkable accuracy' + S: 'in real-time' forms a clean, logical sentence."
  },
  {
    id: 37,
    category: "Verbal Ability",
    difficulty: "Easy",
    question: "Choose the word that best completes the sentence: 'Her explanation was so _____ that no one had any doubts remaining.'",
    options: ["lucid", "opaque", "ambiguous", "vague"],
    correctAnswer: 0,
    explanation: "'Lucid' means expressed clearly and easy to understand."
  },

  // --- COMPUTER SCIENCE & TECHNICAL APTITUDE ---
  {
    id: 38,
    category: "CS & Technical Aptitude",
    difficulty: "Easy",
    question: "What is the worst-case time complexity of searching an element in a balanced Binary Search Tree (BST)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 1,
    explanation: "In a balanced BST with n elements, tree height is log n. Searching takes O(log n) comparisons."
  },
  {
    id: 39,
    category: "CS & Technical Aptitude",
    difficulty: "Medium",
    question: "In JavaScript, what will the expression `typeof null` evaluate to?",
    options: ["'null'", "'undefined'", "'object'", "'boolean'"],
    correctAnswer: 2,
    explanation: "In JavaScript, `typeof null` returns `'object'` due to a historical legacy implementation in the JS engine."
  },
  {
    id: 40,
    category: "CS & Technical Aptitude",
    difficulty: "Medium",
    question: "Which data structure follows the Last-In, First-Out (LIFO) order?",
    options: ["Queue", "Stack", "Linked List", "Binary Tree"],
    correctAnswer: 1,
    explanation: "A Stack follows the Last-In First-Out (LIFO) discipline, where the element pushed last is popped first."
  },
  {
    id: 41,
    category: "CS & Technical Aptitude",
    difficulty: "Hard",
    question: "In SQL, which clause is used to filter the groups created by a `GROUP BY` clause?",
    options: ["WHERE", "ORDER BY", "HAVING", "LIMIT"],
    correctAnswer: 2,
    explanation: "`HAVING` filters grouped rows based on aggregate conditions, whereas `WHERE` filters individual rows prior to grouping."
  },
  {
    id: 42,
    category: "CS & Technical Aptitude",
    difficulty: "Easy",
    question: "What is the primary function of DNS (Domain Name System) on the Internet?",
    options: [
      "Encrypting communication channels",
      "Translating human-readable domain names to IP addresses",
      "Managing database transactions",
      "Allocating dynamic RAM"
    ],
    correctAnswer: 1,
    explanation: "DNS translates human-readable hostnames (like example.com) into numerical IP addresses (like 192.0.2.1)."
  },
  {
    id: 43,
    category: "CS & Technical Aptitude",
    difficulty: "Medium",
    question: "Which HTTP status code signifies that a requested resource was 'Not Found'?",
    options: ["200", "301", "404", "500"],
    correctAnswer: 2,
    explanation: "HTTP status 404 indicates that the server cannot find the requested URL."
  },
  {
    id: 44,
    category: "CS & Technical Aptitude",
    difficulty: "Medium",
    question: "What will `console.log(1 + '2' + 3)` output in JavaScript?",
    options: ["6", "'123'", "'15'", "NaN"],
    correctAnswer: 1,
    explanation: "In JS, binary `+` with a string coerces operands to strings: 1 + '2' = '12', then '12' + 3 = '123'."
  },
  {
    id: 45,
    category: "CS & Technical Aptitude",
    difficulty: "Hard",
    question: "Which ACID property ensures that all operations in a database transaction succeed or none take effect?",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    correctAnswer: 0,
    explanation: "Atomicity ensures 'all or nothing' execution: if any part of a transaction fails, the entire transaction is rolled back."
  },
  {
    id: 46,
    category: "CS & Technical Aptitude",
    difficulty: "Easy",
    question: "Which protocol is used for securely transmitting web pages across the internet?",
    options: ["FTP", "HTTP", "HTTPS", "SMTP"],
    correctAnswer: 2,
    explanation: "HTTPS (Hypertext Transfer Protocol Secure) encrypts communication over TLS/SSL."
  },
  {
    id: 47,
    category: "CS & Technical Aptitude",
    difficulty: "Medium",
    question: "What is the time complexity of QuickSort in the average case?",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    correctAnswer: 1,
    explanation: "QuickSort has an average and best-case time complexity of O(n log n)."
  },
  {
    id: 48,
    category: "CS & Technical Aptitude",
    difficulty: "Medium",
    question: "In Object-Oriented Programming, what is the mechanism called when a child class provides a specific implementation of a method already provided by its parent class?",
    options: ["Method Overloading", "Method Overriding", "Encapsulation", "Abstraction"],
    correctAnswer: 1,
    explanation: "Method Overriding allows a subclass to define a specific behavior for a method inherited from a superclass."
  },
  {
    id: 49,
    category: "CS & Technical Aptitude",
    difficulty: "Hard",
    question: "What condition is NOT one of Coffman's four necessary conditions for deadlock in operating systems?",
    options: ["Mutual Exclusion", "Hold and Wait", "Preemption allowed", "Circular Wait"],
    correctAnswer: 2,
    explanation: "The four Coffman conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. 'Preemption allowed' prevents deadlocks."
  },
  {
    id: 50,
    category: "CS & Technical Aptitude",
    difficulty: "Easy",
    question: "In Git, which command creates a new local branch and immediately switches to it?",
    options: ["git branch -d", "git checkout -b", "git commit -m", "git push origin"],
    correctAnswer: 1,
    explanation: "`git checkout -b <branch_name>` (or `git switch -c <branch_name>`) creates and switches to a new branch."
  },
  {
    id: 51,
    category: "Quantitative Aptitude",
    difficulty: "Medium",
    question: "The perimeter of a square is equal to the perimeter of a rectangle with length 16 cm and breadth 12 cm. What is the area of the square?",
    options: ["169 sq cm", "196 sq cm", "225 sq cm", "256 sq cm"],
    correctAnswer: 1,
    explanation: "Perimeter of rectangle = 2*(16 + 12) = 56 cm. Side of square = 56 / 4 = 14 cm. Area of square = 14 * 14 = 196 sq cm."
  },
  {
    id: 52,
    category: "Logical Reasoning",
    difficulty: "Medium",
    question: "In a row of 30 students, Rahul is 12th from the left end. What is his position from the right end?",
    options: ["18th", "19th", "20th", "21st"],
    correctAnswer: 1,
    explanation: "Position from right = (Total students - Position from left) + 1 = (30 - 12) + 1 = 18 + 1 = 19th."
  },
  {
    id: 53,
    category: "Verbal Ability",
    difficulty: "Easy",
    question: "Choose the correct one-word substitution for: 'A person who writes computer programs'",
    options: ["Calligrapher", "Developer", "Lexicographer", "Choreographer"],
    correctAnswer: 1,
    explanation: "A Developer (or Programmer/Software Engineer) creates and writes computer programs."
  },
  {
    id: 54,
    category: "CS & Technical Aptitude",
    difficulty: "Medium",
    question: "Which of the following data structures is most suitable for implementing a Breadth-First Search (BFS) graph traversal?",
    options: ["Stack", "Queue", "Priority Queue", "Array"],
    correctAnswer: 1,
    explanation: "BFS explores neighbor vertices level by level, requiring a Queue (FIFO) to manage visited frontiers."
  },
  {
    id: 55,
    category: "Quantitative Aptitude",
    difficulty: "Easy",
    question: "If 5 pencils cost ₹25, how much will 18 pencils cost at the same rate?",
    options: ["₹75", "₹80", "₹90", "₹100"],
    correctAnswer: 2,
    explanation: "Cost of 1 pencil = 25 / 5 = ₹5. Cost of 18 pencils = 18 * ₹5 = ₹90."
  }
];

export const QUESTION_SET_OPTIONS = [
  {
    count: 20,
    name: "Quick Practice Sprint",
    durationMinutes: 20,
    tag: "Fast & Focused",
    description: "Ideal for a brisk 20-minute practice session before an interview round.",
    badgeColor: "#3b82f6"
  },
  {
    count: 30,
    name: "Standard Placement Drive",
    durationMinutes: 30,
    tag: "Most Popular",
    description: "Simulates typical 30-question placement screening tests used by tech firms.",
    badgeColor: "#8b5cf6"
  },
  {
    count: 50,
    name: "Comprehensive Assessment Marathon",
    durationMinutes: 50,
    tag: "Full Evaluation",
    description: "Deep-dive evaluation testing full Quantitative, Logical, Verbal, and CS domains.",
    badgeColor: "#10b981"
  }
];
