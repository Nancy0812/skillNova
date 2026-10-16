/**
 * SkillNova Foundational Skills Catalog
 * Curated 3 to 5 beginner-friendly, progressive foundational skills for each career track.
 * Includes short descriptions explaining why each skill matters to beginners.
 */

export const FOUNDATIONAL_SKILLS_BY_FAMILY = {
  "Data & Analytics": [
    {
      id: "da_spreadsheets",
      name: "Spreadsheet Fundamentals",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "The universal baseline for organizing, filtering, and summarizing business records before touching code.",
      freeResourceUrl: "https://www.w3schools.com/excel/",
      taskTitle: "Learn Data Filtering & Formulas in Spreadsheets",
      taskDescription: "Practice SUM, AVERAGE, VLOOKUP/XLOOKUP, and pivot table summaries on a sample student grade dataset."
    },
    {
      id: "da_sql",
      name: "Basic SQL",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Enables you to extract, filter, and sort specific records directly from relational database tables.",
      freeResourceUrl: "https://www.w3schools.com/sql/",
      taskTitle: "Master SELECT, WHERE, and ORDER BY Queries",
      taskDescription: "Write basic SQL queries to retrieve filtered product records and calculate record counts."
    },
    {
      id: "da_interpretation",
      name: "Data Interpretation",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Helps you turn raw numbers into clear, practical business takeaways and answers to questions.",
      freeResourceUrl: "https://developer.mozilla.org/en-US/docs/Learn",
      taskTitle: "Analyze a Sample Business KPI Report",
      taskDescription: "Review monthly sales numbers and identify two key trends and one area needing improvement."
    },
    {
      id: "da_statistics",
      name: "Basic Statistics",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Gives you confidence calculating averages, medians, percentages, and understanding distributions.",
      freeResourceUrl: "https://www.khanacademy.org/math/statistics-probability",
      taskTitle: "Calculate Central Tendencies & Distributions",
      taskDescription: "Calculate mean, median, and percentage changes on real-world test scores."
    },
    {
      id: "da_visualization",
      name: "Charts & Visualizations",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Ensures you can choose the right chart (bar, line, or pie) to communicate your findings clearly to others.",
      freeResourceUrl: "https://www.tableau.com/learn/articles/data-visualization",
      taskTitle: "Create a Clear Comparison Bar Chart",
      taskDescription: "Plot category-wise revenue comparison and format titles and labels for readability."
    }
  ],

  "Web Development": [
    {
      id: "wd_html",
      name: "HTML Fundamentals",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "The foundational skeleton of every web page, defining headings, paragraphs, buttons, and forms.",
      freeResourceUrl: "https://developer.mozilla.org/en-US/docs/Learn/HTML",
      taskTitle: "Build a Semantic Web Page Structure",
      taskDescription: "Create a simple personal profile page using <header>, <main>, <article>, and <footer> tags."
    },
    {
      id: "wd_css",
      name: "CSS Fundamentals",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Controls colors, typography, spacing, and responsive layout across desktop and mobile screens.",
      freeResourceUrl: "https://developer.mozilla.org/en-US/docs/Learn/CSS",
      taskTitle: "Apply Responsive Colors & Flexbox Spacing",
      taskDescription: "Style a three-card layout with comfortable padding and clean hover transitions."
    },
    {
      id: "wd_js",
      name: "JavaScript Fundamentals",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Brings web pages to life with user interaction, button clicks, and dynamic data updates.",
      freeResourceUrl: "https://javascript.info/",
      taskTitle: "Write Basic Interactive Event Handlers",
      taskDescription: "Build a counter button that updates a displayed number whenever a user clicks it."
    },
    {
      id: "wd_apis",
      name: "Working with Web APIs",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Connects your frontend web pages to server data to display real information dynamically.",
      freeResourceUrl: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data",
      taskTitle: "Fetch & Render Data from a Public API",
      taskDescription: "Use fetch() to load a sample JSON quote or weather status and render it inside a card."
    }
  ],

  "Software Development": [
    {
      id: "sd_prog_basics",
      name: "Programming Fundamentals",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Core problem-solving logic using variables, if/else conditions, loops, and modular functions.",
      freeResourceUrl: "https://docs.python.org/3/tutorial/",
      taskTitle: "Write Structured Functions & Loops",
      taskDescription: "Implement a script that processes a list of student grades and returns passing students."
    },
    {
      id: "sd_http_apis",
      name: "HTTP & Basic APIs",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Teaches how web applications communicate using GET, POST requests, status codes, and JSON payloads.",
      freeResourceUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
      taskTitle: "Inspect HTTP Requests and JSON Responses",
      taskDescription: "Examine request headers, query parameters, and JSON responses in browser developer tools."
    },
    {
      id: "sd_db_basics",
      name: "Basic SQL & Databases",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Essential for storing user accounts, product catalogs, and application records safely.",
      freeResourceUrl: "https://www.w3schools.com/sql/",
      taskTitle: "Design a Simple 2-Table Relational Schema",
      taskDescription: "Write SQL to create a users table and an orders table linked by user_id."
    },
    {
      id: "sd_git",
      name: "Version Control with Git",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Safely records your code history and enables team collaboration without overwriting files.",
      freeResourceUrl: "https://git-scm.com/book/en/v2",
      taskTitle: "Stage, Commit & Branch in Git",
      taskDescription: "Initialize a local git repository, create a feature branch, and commit your first code change."
    }
  ],

  "AI & Machine Learning": [
    {
      id: "ai_python",
      name: "Python Fundamentals",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "The primary programming language for data manipulation, statistical modeling, and AI experimentation.",
      freeResourceUrl: "https://docs.python.org/3/tutorial/",
      taskTitle: "Practice Python Lists, Dictionaries & Functions",
      taskDescription: "Write functions to filter and transform lists of dictionary records."
    },
    {
      id: "ai_spreadsheets",
      name: "Tabular Data & CSV Handling",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Every machine learning problem starts with reading, inspecting, and cleaning tabular data rows.",
      freeResourceUrl: "https://pandas.pydata.org/docs/getting_started/index.html",
      taskTitle: "Load & Inspect a CSV with Pandas",
      taskDescription: "Load a CSV file, inspect missing values with df.isnull(), and calculate column summary statistics."
    },
    {
      id: "ai_stats",
      name: "Basic Statistics & Probability",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Helps you understand whether a pattern is meaningful or just random chance.",
      freeResourceUrl: "https://www.khanacademy.org/math/statistics-probability",
      taskTitle: "Calculate Mean, Variance & Percentiles",
      taskDescription: "Compute distribution statistics on sample dataset metrics to understand data spread."
    },
    {
      id: "ai_prep",
      name: "Introductory Data Preparation",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Teaches you how to handle missing data, scale numbers, and separate training and test sets.",
      freeResourceUrl: "https://scikit-learn.org/stable/tutorial/basic/tutorial.html",
      taskTitle: "Clean & Split a Small Dataset",
      taskDescription: "Replace missing values with column medians and practice an 80/20 train-test split."
    }
  ],

  "Cloud & DevOps": [
    {
      id: "cd_os_basics",
      name: "Computer & OS Fundamentals",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Understanding operating systems, processes, memory, and how software runs on physical and virtual servers.",
      freeResourceUrl: "https://linuxjourney.com/",
      taskTitle: "Understand OS Processes and Memory Allocation",
      taskDescription: "Learn how CPU, RAM, and background daemon processes interact on server machines."
    },
    {
      id: "cd_cli",
      name: "Command Line & Shell Basics",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Cloud servers have no graphical desktop; command line navigation is the primary way engineers interact.",
      freeResourceUrl: "https://linuxjourney.com/",
      taskTitle: "Navigate Directories & Inspect Files via Terminal",
      taskDescription: "Practice terminal commands (ls, cd, cat, grep, ps) to inspect files and processes."
    },
    {
      id: "cd_networking",
      name: "Networking Fundamentals",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Covers IP addresses, DNS domain lookup, ports, and how computers communicate over the internet.",
      freeResourceUrl: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanisms/How_does_the_Internet_work",
      taskTitle: "Trace DNS Lookup and Port Communication",
      taskDescription: "Use ping and curl to inspect how domain names resolve to IP addresses and port 80/443."
    },
    {
      id: "cd_docker",
      name: "Container Basics (Docker)",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Packages applications with all their dependencies so they run identically on any machine.",
      freeResourceUrl: "https://www.docker.com/101-tutorial/",
      taskTitle: "Run a Prebuilt Container Instance",
      taskDescription: "Learn what an image is vs a running container and how port mapping connects to your browser."
    }
  ],

  "Cybersecurity": [
    {
      id: "cs_networking",
      name: "Networking Fundamentals",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Understanding TCP/IP, routers, switches, and packets is required to analyze traffic and defend systems.",
      freeResourceUrl: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanisms/How_does_the_Internet_work",
      taskTitle: "Understand the OSI Model & TCP/IP Basics",
      taskDescription: "Learn the difference between packet routing, TCP connections, and UDP transmissions."
    },
    {
      id: "cs_os_basics",
      name: "Operating System & Permissions",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Most security vulnerabilities involve improper user access rights, file permissions, and weak credentials.",
      freeResourceUrl: "https://linuxjourney.com/",
      taskTitle: "Audit File Permissions & User Privileges",
      taskDescription: "Inspect read, write, and execute permissions on files and understand least privilege concepts."
    },
    {
      id: "cs_fundamentals",
      name: "Security Fundamentals (CIA Triad)",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "The core foundation: Confidentiality (encryption), Integrity (hashing), and Availability (resilience).",
      freeResourceUrl: "https://www.cisa.gov/cybersecurity-basics",
      taskTitle: "Apply the CIA Triad to Real Scenarios",
      taskDescription: "Evaluate three common scenarios (password leak, altered database record, server outage) against CIA principles."
    },
    {
      id: "cs_logs",
      name: "Threat & Log Basics",
      level: "Beginner",
      status: "Not Started",
      whyItMatters: "Teaches you how to read system log entries and spot suspicious failed authentication attempts.",
      freeResourceUrl: "https://www.cisa.gov/cybersecurity-basics",
      taskTitle: "Review a Sample Authentication Access Log",
      taskDescription: "Identify repeated failed login attempts from a single IP address in a mock web server log."
    }
  ]
};

// Helper to look up foundational skills by role title or family
export function getFoundationalSkillsForRole(roleTitle, roleFamily) {
  if (roleFamily && FOUNDATIONAL_SKILLS_BY_FAMILY[roleFamily]) {
    return FOUNDATIONAL_SKILLS_BY_FAMILY[roleFamily];
  }

  // Fallback by roleTitle keywords
  const titleLower = (roleTitle || '').toLowerCase();
  if (titleLower.includes('data') || titleLower.includes('analyst') || titleLower.includes('intelligence')) {
    return FOUNDATIONAL_SKILLS_BY_FAMILY["Data & Analytics"];
  }
  if (titleLower.includes('front') || titleLower.includes('web') || titleLower.includes('full stack')) {
    return FOUNDATIONAL_SKILLS_BY_FAMILY["Web Development"];
  }
  if (titleLower.includes('back') || titleLower.includes('python') || titleLower.includes('java') || titleLower.includes('software')) {
    return FOUNDATIONAL_SKILLS_BY_FAMILY["Software Development"];
  }
  if (titleLower.includes('scientist') || titleLower.includes('nlp') || titleLower.includes('ai') || titleLower.includes('machine')) {
    return FOUNDATIONAL_SKILLS_BY_FAMILY["AI & Machine Learning"];
  }
  if (titleLower.includes('cloud') || titleLower.includes('devops')) {
    return FOUNDATIONAL_SKILLS_BY_FAMILY["Cloud & DevOps"];
  }
  if (titleLower.includes('security') || titleLower.includes('soc')) {
    return FOUNDATIONAL_SKILLS_BY_FAMILY["Cybersecurity"];
  }

  return FOUNDATIONAL_SKILLS_BY_FAMILY["Data & Analytics"];
}

// Beginner-friendly diagnostic assessment questions mapped by skill name
export const BEGINNER_ASSESSMENT_QUESTIONS = {
  "Spreadsheet Fundamentals": [
    {
      id: 101,
      skill_name: "Spreadsheet Fundamentals",
      question_text: "Which formula in a spreadsheet calculates the total sum of numbers in cells A1 through A10?",
      options: ["=TOTAL(A1:A10)", "=SUM(A1:A10)", "=ADD(A1..A10)", "=COUNT(A1:A10)"],
      correct_option_index: 1,
      explanation: "=SUM(A1:A10) is the standard formula to add up all numerical values in that cell range."
    },
    {
      id: 102,
      skill_name: "Spreadsheet Fundamentals",
      question_text: "What is the primary benefit of using a Pivot Table in spreadsheet software?",
      options: [
        "It automatically backs up your computer files to the cloud",
        "It allows you to quickly summarize, slice, and view large datasets without writing formulas",
        "It changes the font color of every cell automatically",
        "It translates text into different languages"
      ],
      correct_option_index: 1,
      explanation: "Pivot tables allow you to group, aggregate, and explore tabular data dynamically with simple drag-and-drop fields."
    }
  ],

  "Basic SQL": [
    {
      id: 201,
      skill_name: "Basic SQL",
      question_text: "Which SQL keyword is used to choose which columns you want to view from a database table?",
      options: ["GET", "CHOOSE", "SELECT", "FILTER"],
      correct_option_index: 2,
      explanation: "SELECT specifies the columns to return (e.g., SELECT student_name, grade FROM students)."
    },
    {
      id: 202,
      skill_name: "Basic SQL",
      question_text: "How do you filter records so that only students with a grade of 'A' are returned?",
      options: [
        "WHERE grade = 'A'",
        "HAVING grade IS 'A'",
        "IF grade EQUALS 'A'",
        "GROUP BY grade = 'A'"
      ],
      correct_option_index: 0,
      explanation: "The WHERE clause filters individual rows before any groupings are formed."
    }
  ],

  "Data Interpretation": [
    {
      id: 301,
      skill_name: "Data Interpretation",
      question_text: "If a company's website visitors increased by 20% while sales dropped by 10%, what is the most reasonable initial observation?",
      options: [
        "More visitors are arriving, but fewer are completing purchases, indicating potential checkout or pricing friction",
        "The website is completely broken and has zero visitors",
        "Sales dropped because the math was calculated incorrectly",
        "More visitors always guarantees higher sales"
      ],
      correct_option_index: 0,
      explanation: "Interpreting data requires looking at relationships: traffic grew, but conversion rate dropped, pointing to product or checkout questions."
    }
  ],

  "Basic Statistics": [
    {
      id: 401,
      skill_name: "Basic Statistics",
      question_text: "If five students score 70, 75, 80, 85, and 90 on a test, what is the median score?",
      options: ["75", "80", "85", "82"],
      correct_option_index: 1,
      explanation: "The median is the middle value when data is sorted in ascending order. Here, 80 is right in the center."
    }
  ],

  "Charts & Visualizations": [
    {
      id: 501,
      skill_name: "Charts & Visualizations",
      question_text: "Which chart type is most effective for showing how a single metric changes over time (e.g. monthly revenue over a year)?",
      options: ["Line Chart", "Pie Chart", "Scatter Plot", "Radar Chart"],
      correct_option_index: 0,
      explanation: "Line charts connect consecutive data points across time intervals, making trends and seasonal patterns easy to spot."
    }
  ],

  "HTML Fundamentals": [
    {
      id: 601,
      skill_name: "HTML Fundamentals",
      question_text: "Which HTML element is the correct choice for the primary heading of a web page?",
      options: ["<heading>", "<head>", "<h1>", "<header>"],
      correct_option_index: 2,
      explanation: "<h1> represents the top-level heading on a web page and is crucial for document structure and accessibility."
    }
  ],

  "CSS Fundamentals": [
    {
      id: 701,
      skill_name: "CSS Fundamentals",
      question_text: "In CSS, which property is used to add space INSIDE a box between its content and its border?",
      options: ["margin", "padding", "gap", "border-spacing"],
      correct_option_index: 1,
      explanation: "padding creates internal breathing room inside an element, whereas margin creates space outside the element's border."
    }
  ],

  "JavaScript Fundamentals": [
    {
      id: 801,
      skill_name: "JavaScript Fundamentals",
      question_text: "Which keyword in modern JavaScript declares a variable whose value cannot be reassigned to a new identifier?",
      options: ["var", "let", "const", "static"],
      correct_option_index: 2,
      explanation: "'const' creates an immutable variable binding that prevents reassignment."
    }
  ]
};
