import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-black mb-6">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-blue max-w-none text-black prose-headings:text-black prose-p:text-black prose-li:text-black">
            <h2 className="text-black">1. Introduction</h2>
            <p className="text-black">Welcome to Deed League API ("we," "our," or "us"). By accessing or using our website, mobile applications, API, or any other services we offer (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). Please read these Terms carefully. If you do not agree with these Terms, you should not access or use our Services.</p>
            
            <h2 className="text-black">2. Definitions</h2>
            <p className="text-black">In these Terms:</p>
            <ul className="text-black">
              <li className="text-black"><strong className="text-black">"User"</strong> means any individual who accesses or uses our Services.</li>
              <li className="text-black"><strong className="text-black">"Content"</strong> means any data, text, graphics, images, audio, video, software, code, or other materials available through our Services.</li>
              <li className="text-black"><strong className="text-black">"User Content"</strong> means any content that Users contribute to our Services.</li>
              <li className="text-black"><strong className="text-black">"API"</strong> means our application programming interface that allows developers to access our data.</li>
            </ul>
            
            <h2 className="text-black">3. Account Registration</h2>
            <p className="text-black">To access certain features of our Services, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your account credentials and for any activities or actions under your account. We reserve the right to disable your account if we determine, in our sole discretion, that you have violated these Terms.</p>
            
            <h2 className="text-black">4. License and Restrictions</h2>
            <p className="text-black">Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use our Services for your personal or internal business purposes. You may not:</p>
            <ul className="text-black">
              <li className="text-black">Use our Services in any manner that could disable, overburden, damage, or impair our Services or interfere with any other party's use of our Services;</li>
              <li className="text-black">Use any robot, spider, or other automatic device, process, or means to access our Services for any purpose, including monitoring or copying any of the material on our Services;</li>
              <li className="text-black">Use any manual process to monitor or copy any of the material on our Services or for any other unauthorized purpose without our prior written consent;</li>
              <li className="text-black">Use any device, software, or routine that interferes with the proper working of our Services;</li>
              <li className="text-black">Introduce any viruses, Trojan horses, worms, logic bombs, or other malicious or technologically harmful material;</li>
              <li className="text-black">Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of our Services, the server on which our Services are stored, or any server, computer, or database connected to our Services;</li>
              <li className="text-black">Attack our Services via a denial-of-service attack or a distributed denial-of-service attack;</li>
              <li className="text-black">Otherwise attempt to interfere with the proper working of our Services.</li>
            </ul>
            
            <h2 className="text-black">5. API Terms</h2>
            <p className="text-black">If you use our API, you acknowledge and agree to the following additional terms:</p>
            <ul className="text-black">
              <li className="text-black">API keys must be kept confidential and secure;</li>
              <li className="text-black">You will comply with any rate limits and other restrictions we impose on API usage;</li>
              <li className="text-black">We may monitor your use of the API;</li>
              <li className="text-black">We may modify, suspend, or discontinue the API at any time;</li>
              <li className="text-black">You will not use the API to create a product that competes with our Services.</li>
            </ul>
            
            <h2 className="text-black">6. Data Accuracy</h2>
            <p className="text-black">While we strive to provide accurate data, we do not guarantee the accuracy, completeness, or timeliness of any information provided through our Services. We are not responsible for any errors or omissions, or for the results obtained from the use of such information.</p>
            
            <h2 className="text-black">7. Intellectual Property Rights</h2>
            <p className="text-black">Our Services and their entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by us, our licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
            
            <h2 className="text-black">8. User Content</h2>
            <p className="text-black">You retain ownership of any User Content you submit to our Services. However, by providing User Content, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the User Content in connection with our Services and our business.</p>
            <p className="text-black">You represent and warrant that you own or control all rights in and to the User Content and have the right to grant the license granted above, and that the User Content does not violate any third-party rights or applicable laws.</p>
            
            <h2 className="text-black">9. Digital Millennium Copyright Act</h2>
            <p className="text-black">If you believe that any content on our Services infringes your copyright, please send a notification to our designated copyright agent containing the following information:</p>
            <ul className="text-black">
              <li className="text-black">A physical or electronic signature of a person authorized to act on behalf of the owner of the copyright interest;</li>
              <li className="text-black">A description of the copyrighted work that you claim has been infringed;</li>
              <li className="text-black">A description of where the material that you claim is infringing is located on our Services;</li>
              <li className="text-black">Your address, telephone number, and email address;</li>
              <li className="text-black">A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;</li>
              <li className="text-black">A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>
            </ul>
            
            <h2 className="text-black">10. Disclaimer of Warranties</h2>
            <p className="text-black">YOUR USE OF OUR SERVICES IS AT YOUR SOLE RISK. OUR SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
            <p className="text-black">WE DO NOT WARRANT THAT OUR SERVICES WILL MEET YOUR REQUIREMENTS, THAT OUR SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, THAT THE INFORMATION PROVIDED THROUGH OUR SERVICES WILL BE ACCURATE, RELIABLE, OR COMPLETE, OR THAT ANY DEFECTS IN OUR SERVICES WILL BE CORRECTED.</p>
            
            <h2 className="text-black">11. Limitation of Liability</h2>
            <p className="text-black">IN NO EVENT SHALL WE OR OUR DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, PARTNERS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM: (I) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE OUR SERVICES; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON OUR SERVICES; (III) ANY CONTENT OBTAINED FROM OUR SERVICES; AND (IV) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.</p>
            
            <h2 className="text-black">12. Indemnification</h2>
            <p className="text-black">You agree to defend, indemnify, and hold harmless us and our directors, officers, employees, agents, partners, suppliers, and licensors from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of our Services.</p>
            
            <h2 className="text-black">13. Termination</h2>
            <p className="text-black">We may terminate or suspend your access to all or part of our Services, without notice, for any conduct that we, in our sole discretion, believe violates these Terms or is harmful to other users of our Services, us, or third parties, or for any other reason.</p>
            
            <h2 className="text-black">14. Changes to Terms</h2>
            <p className="text-black">We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them. Your continued use of our Services following the posting of revised Terms means that you accept and agree to the changes.</p>
            
            <h2 className="text-black">15. Governing Law</h2>
            <p className="text-black">These Terms and your use of our Services shall be governed by and construed in accordance with the laws of Mongolia, without giving effect to any choice or conflict of law provision or rule.</p>
            
            <h2 className="text-black">16. Dispute Resolution</h2>
            <p className="text-black">Any dispute arising out of or relating to these Terms or our Services shall be resolved through binding arbitration in accordance with the rules of the Mongolian National Arbitration Center. The arbitration shall take place in Ulaanbaatar, Mongolia, in the English language.</p>
            
            <h2 className="text-black">17. Waiver and Severability</h2>
            <p className="text-black">No waiver by us of any term or condition set out in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure by us to assert a right or provision under these Terms shall not constitute a waiver of such right or provision.</p>
            <p className="text-black">If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms will continue in full force and effect.</p>
            
            <h2 className="text-black">18. Entire Agreement</h2>
            <p className="text-black">These Terms constitute the sole and entire agreement between you and us regarding the Services and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, regarding the Services.</p>
            
            <h2 className="text-black">19. Assignment</h2>
            <p className="text-black">You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written consent. Any attempt by you to assign or transfer these Terms without such consent will be null and of no effect. We may assign or transfer these Terms, at our sole discretion, without restriction.</p>
            
            <h2 className="text-black">20. Contact Information</h2>
            <p className="text-black">Questions or comments about the Services or these Terms may be directed to us by emailing us at [legal@mongoliabasketballdata.com].</p>
            
            <h2 className="text-black">21. Data Usage Restrictions</h2>
            <p className="text-black">The basketball data provided through our Services is intended for personal, non-commercial use unless otherwise specified in a separate agreement. Any redistribution, publication, or commercial use of our data without our explicit permission is strictly prohibited.</p>
            
            <h2 className="text-black">22. Feedback</h2>
            <p className="text-black">If you provide us with any feedback, suggestions, improvements, or other information relating to our Services ("Feedback"), you hereby assign to us all right, title, and interest in and to the Feedback, and we shall be free to use the Feedback in any manner without any obligation to you.</p>
            
            <h2 className="text-black">23. Force Majeure</h2>
            <p className="text-black">We shall not be liable for any delay or failure to perform resulting from causes outside our reasonable control, including, but not limited to, acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, epidemic, pandemic, or shortage of transportation facilities, fuel, energy, labor, or materials.</p>
            
            <h2 className="text-black">24. Third-Party Links</h2>
            <p className="text-black">Our Services may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
