const mockTemplateData = {
  priceCardArea: [
    {
      role: "TITLE",
      content: "Lorem ipsum dolor sit amet"
    },
    {
      role: "SUBTITLE",
      content: "Consectetur adipiscing elit"
    }
  ],
  chartArea: [
    {
      role: "TITLE",
      content: "Sed do eiusmod tempor incididunt"
    },
    {
      role: "PADDING",
      content: "85"
    }
  ],
  faqArea: [
    {
      role: "TITLE",
      content: "Ut enim ad minim veniam"
    },
    {
      role: "PADDING",
      content: "85"
    }
  ],
  priceCard: [
    {
      title: "Basic Plan",
      price: 19900,
      discountRate: 10,
      detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      feature: "Lorem ipsum dolor sit amet",
      content: ["Feature 1", "Feature 2", "Feature 3"]
    },
    {
      title: "Pro Plan",
      price: 26800,
      discountRate: 20,
      detail: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      feature: "Consectetur adipiscing elit",
      content: ["Pro 1", "Pro 2", "Pro 3"]
    },
    {
      title: "eXtreme Plan",
      price: 59000,
      discountRate: 10,
      detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      feature: "Lorem ipsum dolor sit amet",
      content: ["eXtreme 1", "eXtreme 2", "eXtreme 3"]
    },
   
  ],
  chart: [
    {
      haveHeader: true,
      featureName: false,
      table: [
        {
          feature: "Feature",
          desc: ["Yikes 111", "Yes", "yes?"]
        },
        {
          feature: "Feature 2",
          desc: ["Reroy", "Jenkinnnnnnnnnnnnnnnnnnnnnns", "baby"],
        }
      ]
    }
  ],
  faq: [
    {
      question: "How do I get started?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ],
  mainColor: "#FF0000",
  subColor: ["#00FF00", "#0000FF"],
  font: "Arial",
  logoImageUrl: "https://example.com/logo.png",
  previewUrl: "https://example.com/preview.png",
  padding: [200, 150],
  templateName: "Mock Template",
  isCheckPerPerson: true,
  headDiscount: [
    {
      headCount: 5,
      discountRate: 15
    },
    {
      headCount: 10,
      discountRate: 25
    }
  ],
  isCheckPerYear: false,
  yearDiscountRate: 0,
  isCardSet: false,
  priceCardAreaPadding: 30
};

export default mockTemplateData;
