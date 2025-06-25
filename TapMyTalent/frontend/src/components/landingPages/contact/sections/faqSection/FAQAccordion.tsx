import { useState } from "react";
import "./FAQAccordion.css";

const faqs = [
  {
    question: "What is TapMyTalent?",
    answer: "TapMyTalent is a staffing and career development company dedicated to connecting talented individuals with their ideal job opportunities. We provide mentoring, interview coaching, resume optimization, and job placement services in industries such as IT, engineering, and digital marketing."
  },
  {
    question: "What services does TapMyTalent offer?",
    answer: <div>
      We offer:<br/>
      <ul>
        <li>Job Search Strategies: Helping candidates navigate the job market with targeted approaches.</li>
        <li>Resume & LinkedIn Optimization: Crafting tailored resumes to enhance visibility.</li>
        <li>Interview Preparation: Conducting mock interviews and offering feedback.</li>
        <li>Job Matching & Applications: Connecting candidates with relevant job opportunities.</li>
        <li>Offer Negotiation: Assisting in salary and benefits negotiations.</li>
        <li>Visa Support: Helping international candidates with documentation and legal processes.</li>
      </ul>
    </div>
  },
  {
    question: "How does TapMyTalent's job placement process work?",
    answer: <div>
      Our process includes:<br/>
      <ol>
        <li>Initial Consultation: Understanding your career goals.</li>
        <li>Profile Enhancement: Resume and LinkedIn makeover.</li>
        <li>Job Matching & Applications: Identifying suitable roles and applying strategically.</li>
        <li>Interview Coordination & Preparation: Scheduling interviews and offering mock sessions.</li>
        <li>Offer Negotiation: Helping you get the best employment package.</li>
        <li>Post-Placement Support: Ensuring a smooth transition into your new role.</li>
      </ol>
    </div>
  },
  {
    question: "How does TapMyTalent charge for its services?",
    answer: <div>
      We charge an upfront fee for any plan you choose from our existing plans. We offer distinctive plans some of them are:<br/><br/>
      <div>Basic Plan – Resume optimization, job matching, and application assistance.</div>
      <div>Standard Plan – Includes interview prep, interview coordination, and visa guidance.</div>
      <div>Premium Plan – Dedicated recruiters, exclusive job opportunities, and priority support.</div><br/>
      Additionally, we charge a 15% success fee from your first-year annual salary, payable within 5-7 months after placement for specific plans.
    </div>
  },
  {
    question: "Do I need to pay if I don't get a job?",
    answer: "No, the success fee is only applicable after you secure a job through TapMyTalent."
  },
  {
    question: "What happens if my employment ends before completing the repayment?",
    answer: "If you are involuntarily terminated, you are not required to pay the remaining balance. If you voluntarily leave your job, the remaining payments still apply unless TapMyTalent helps you secure another role."
  },
  {
    question: "How can I apply for job assistance?",
    answer: "You can fill out our Candidate Information Form available on our website and provide necessary details such as your education, experience, and career preferences."
  },
  {
    question: "Does TapMyTalent provide visa support?",
    answer: "Yes, we assist international candidates with visa guidance and documentation to ensure a smooth transition."
  },
  {
    question: "How can I contact TapMyTalent?",
    answer: <div>
      You can reach us via:<br/>
      <div>📧 Email: info@tapmytalent.com</div>
      <div>📞 Phone: +1 (519) 953-5756</div>
      <div>🌐 Website: www.tapmytalent.com</div>
    </div>
  }
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
    className="faq-section"
    >
    <div id="faq-section" className="faq-container">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <button className="faq-question" onClick={() => toggleFAQ(index)}>
            <span>{index + 1}. {faq.question}</span>
            <span className="faq-icon">{openIndex === index ? "−" : "+"}</span>
          </button>
          {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
        </div>
      ))}
    </div>
    </section>
  );
};

export default FAQAccordion;
