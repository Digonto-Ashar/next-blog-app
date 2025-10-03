import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Blogging | My Next.js Blog',
  description: 'Discover the philosophy behind our blog and the power of sharing knowledge.',
};

// An array to hold the quotes
const bloggingQuotes = [
  {
    text: "Blogging is not just about writing, it's about building a community around your passion.",
    author: "Anonymous"
  },
  {
    text: "The currency of blogging is not eyeballs, but trust.",
    author: "Jason Calacanis"
  },
  {
    text: "A blog is only as interesting as the interest shown in others.",
    author: "Lee Odden"
  },
  {
    text: "To blog is to share, to connect, to create, and to learn.",
    author: "Penelope Trunk"
  }
];

const AboutPage = () => {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-4">The Art of Blogging</h1>
      
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        <p>
          In a world brimming with information, a blog serves as a personal lighthouse, guiding readers through the vast sea of knowledge. It's a digital canvas for expressing thoughts, sharing expertise, and telling stories that matter. Blogging is more than just publishing content; it's an act of connection. It's about building a community of like-minded individuals, sparking meaningful conversations, and creating a space where ideas can flourish. Whether for personal expression or professional growth, a well-tended blog becomes a testament to the power of a single voice to inspire, educate, and make a difference.
        </p>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Inspirational Quotes</h2>
          <div className="space-y-8">
            {bloggingQuotes.map((quote, index) => (
              <blockquote key={index} className="border-l-4 border-blue-500 pl-6 italic text-gray-600">
                <p className="mb-2 text-xl">
                  "{quote.text}"
                </p>
                <footer className="text-right text-base text-gray-500 not-italic">— {quote.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
