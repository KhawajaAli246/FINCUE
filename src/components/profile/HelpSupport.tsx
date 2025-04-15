import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  HelpCircle,
  FileText,
  MessageSquare,
  Mail,
  Phone,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden mb-2">
      <button
        className="w-full flex items-center justify-between p-4 text-left font-medium bg-muted/30 hover:bg-muted/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 bg-background">
          <p className="text-muted-foreground">{answer}</p>
        </div>
      )}
    </div>
  );
};

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
  });

  const faqItems = [
    {
      question: "How do I add a new asset to my portfolio?",
      answer:
        "To add a new asset to your portfolio, click on the 'Add Transaction' button in the top navigation bar. Enter the asset details including ticker, quantity, and purchase price, then save the transaction.",
    },
    {
      question: "Can I track cryptocurrency along with stocks?",
      answer:
        "Yes, our platform allows you to track various asset types including stocks, bonds, ETFs, mutual funds, and cryptocurrencies all in one place.",
    },
    {
      question: "How are my portfolio gains calculated?",
      answer:
        "Portfolio gains are calculated by comparing the current market value of your assets to your cost basis (the total amount you invested). This includes both realized gains from sold assets and unrealized gains from assets you still hold.",
    },
    {
      question: "How can I export my transaction history?",
      answer:
        "You can export your transaction history in CSV or PDF format by going to the Transactions tab and clicking the 'Export' button in the upper right corner.",
    },
    {
      question: "Is my financial data secure?",
      answer:
        "Yes, we take security very seriously. All your data is encrypted both in transit and at rest using industry-standard encryption protocols. We also offer two-factor authentication for added security.",
    },
  ];

  const handleSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support request submitted. We'll respond shortly!");
    setContactForm({ subject: "", message: "" });
  };

  const handleContactFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            <span>Find Answers</span>
          </CardTitle>
          <CardDescription>
            Search our knowledge base or browse frequently asked questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Input
              type="search"
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Frequently Asked Questions
            </h3>

            <div className="space-y-2">
              {faqItems.map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span>Contact Support</span>
            </CardTitle>
            <CardDescription>
              Send us a message and we'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitSupport} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactFormChange}
                  placeholder="What do you need help with?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactFormChange}
                  placeholder="Describe your issue in detail"
                  className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Support Request
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Alternative ways to reach us</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-medium">Email Support</h3>
                <p className="text-sm text-muted-foreground">
                  support@fincue.com
                </p>
                <p className="text-xs text-muted-foreground">
                  Responses within 24 hours
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-medium">Phone Support</h3>
                <p className="text-sm text-muted-foreground">
                  +1 (555) 123-4567
                </p>
                <p className="text-xs text-muted-foreground">
                  Mon-Fri, 9AM-5PM EST
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-medium">Documentation</h3>
                <Button variant="link" className="h-auto p-0 text-blue-600">
                  View User Guide
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpSupport;
