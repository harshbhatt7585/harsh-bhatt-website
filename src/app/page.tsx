import Nav from '@/components/Nav';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Nav />
      <main className="max-w-4xl mx-auto py-16 px-6">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">About Me</h1>
          <p className="text-lg leading-relaxed">
            I am Harsh. <br />
            I've been programming since I was 12 years old. <br />
            I started working in AI at 16 — before ChatGPT. <br />
            I've worked at cutting-edge AI companies that have raised millions and earned over $10M ARR. <br />
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-8 text-left">Work Experience</h2>
          <div className="space-y-10 text-left">
            <div>
              <h3 className="text-xl font-bold">Remyx AI</h3>
              <p>Founding Machine Learning Engineer (Full-time)<br />
                Sep 2024 – Dec 2024 · 4 mos · California, United States · Remote
              </p>
              <p>Worked on Evaluation Frameworks</p>
              <p className="mt-2">Technical Advisory Board Member<br />
                Nov 2023 – Aug 2024 · 10 mos
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold">Secta Labs</h3>
              <p>Machine Learning Engineer (Full-time)<br />
                Dec 2023 – Aug 2024 · 9 mos · Austin, Texas, United States · Remote
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Finetuned & tested Diffusion models with Dreambooth, LoRA for personalized models.</li>
                <li>Boosted user save rates by 40% via novel finetuning methods.</li>
                <li>Managed MLOps for SD finetuning. Built parallel & batch inference to 2x generation speed.</li>
                <li>Built user evaluation framework and contributed to headshot/image evaluation:</li>
                <ul className="list-disc list-inside ml-6 space-y-1">
                  <li>Trained AI classifier to detect AI images</li>
                  <li>Built glare detector for glasses</li>
                  <li>Researched new image similarity metric</li>
                </ul>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold">Aragon AI</h3>
              <p>Machine Learning Engineer (Full-time)<br />
                Jul 2023 – Nov 2023 · 5 mos · United States
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold">Voice AI</h3>
              <p>Machine Learning Engineer (Full-time)<br />
                Sep 2022 – Jun 2023 · 10 mos · United States (Remote)
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Worked on TTS & voice cloning with senior engineers.</li>
                <li>Evaluated TTS models like Tortoise-TTS, TransformerTTS.</li>
                <li>Contributed to Nancy++ paper implementation.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
