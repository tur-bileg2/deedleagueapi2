import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <h1 className="text-3xl font-bold text-black mb-6">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-blue max-w-none text-black prose-headings:text-black prose-p:text-black prose-li:text-black">
            <h2 className="text-black">1. Introduction</h2>
            <p className="text-black">Mongolia Basketball Data ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile applications, access our API, or use any other services we offer (collectively, the "Services").</p>
            <p className="text-black">Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Services. We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.</p>
            
            <h2 className="text-black">2. Collection of Your Information</h2>
            <p className="text-black">We may collect information about you in a variety of ways. The information we may collect via the Services includes:</p>
            
            <h3 className="text-black">2.1 Personal Data</h3>
            <p className="text-black">Personal Data is data that identifies a particular individual. While using our Services, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to:</p>
            <ul className="text-black">
              <li className="text-black">Email address</li>
              <li className="text-black">First name and last name</li>
              <li className="text-black">Username</li>
              <li className="text-black">Usage Data</li>
              <li className="text-black">Payment information (for premium subscriptions)</li>
            </ul>
            
            <h3 className="text-black">2.2 Usage Data</h3>
            <p className="text-black">Usage Data is collected automatically when using the Services. Usage Data may include information such as your device's Internet Protocol (IP) address, browser type, browser version, the pages of our Services that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.</p>
            <p className="text-black">When you access the Services by or through a mobile device, we may collect additional information automatically, including, but not limited to, the type of mobile device you use, your mobile device's unique ID, your mobile operating system, the type of mobile internet browser you use, and your mobile service provider.</p>
            <p className="text-black">We may also collect information about how your device has interacted with our Services, including pages accessed and links clicked.</p>
            
            <h3 className="text-black">2.3 Tracking Technologies</h3>
            <p className="text-black">We use various technologies to collect and store information, including cookies, web beacons, pixel tags, browser web storage, and application data caches.</p>
            <p className="text-black">Cookies are small files placed on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services.</p>
            <p className="text-black">Examples of Cookies we use:</p>
            <ul className="text-black">
              <li className="text-black"><strong className="text-black">Session Cookies:</strong> We use Session Cookies to operate our Services.</li>
              <li className="text-black"><strong className="text-black">Preference Cookies:</strong> We use Preference Cookies to remember your preferences and various settings.</li>
              <li className="text-black"><strong className="text-black">Security Cookies:</strong> We use Security Cookies for security purposes.</li>
              <li className="text-black"><strong className="text-black">Advertising Cookies:</strong> Advertising Cookies are used to serve you with advertisements that may be relevant to you and your interests.</li>
            </ul>
            
            <h2 className="text-black">3. Use of Your Information</h2>
            <p className="text-black">We may use the information we collect about you for various purposes, including to:</p>
            <ul className="text-black">
              <li className="text-black">Provide, maintain, and improve our Services;</li>
              <li className="text-black">Notify you about changes to our Services;</li>
              <li className="text-black">Allow you to participate in interactive features of our Services when you choose to do so;</li>
              <li className="text-black">Provide customer support;</li>
              <li className="text-black">Monitor the usage of our Services;</li>
              <li className="text-black">Detect, prevent, and address technical issues;</li>
              <li className="text-black">Fulfill any other purpose for which you provide it;</li>
              <li className="text-black">Carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection;</li>
              <li className="text-black">Provide you with notices about your account and/or subscription, including expiration and renewal notices, email instructions, etc.;</li>
              <li className="text-black">Provide you with news, special offers, and general information about other goods, services, and events which we offer that are similar to those that you have already purchased or enquired about, unless you have opted not to receive such information;</li>
              <li className="text-black">For any other purpose with your consent.</li>
            </ul>
            
            <h2 className="text-black">4. Disclosure of Your Information</h2>
            <p className="text-black">We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
            
            <h3 className="text-black">4.1 Disclosure for Law Enforcement</h3>
            <p className="text-black">Under certain circumstances, we may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</p>
            
            <h3 className="text-black">4.2 Business Transaction</h3>
            <p className="text-black">If we or our subsidiaries are involved in a merger, acquisition, or asset sale, your Personal Data may be transferred. We will provide notice before your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
            
            <h3 className="text-black">4.3 With Your Consent</h3>
            <p className="text-black">We may disclose your personal information for any other purpose with your consent.</p>
            
            <h3 className="text-black">4.4 Other legal requirements</h3>
            <p className="text-black">We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person, or as evidence in litigation in which we are involved.</p>
            
            <h3 className="text-black">4.5 Service Providers</h3>
            <p className="text-black">We may employ third-party companies and individuals to facilitate our Services ("Service Providers"), to provide the Services on our behalf, to perform Service-related services, or to assist us in analyzing how our Services are used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
            
            <h2 className="text-black">5. Security of Your Information</h2>
            <p className="text-black">We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.</p>
            
            <h2 className="text-black">6. Your Data Protection Rights</h2>
            <p className="text-black">Depending on your location, you may have certain rights regarding your personal information, including:</p>
            
            <h3 className="text-black">6.1 Right of Access</h3>
            <p className="text-black">You have the right to request copies of your personal information from us. We may charge you a small fee for this service.</p>
            
            <h3 className="text-black">6.2 Right to Rectification</h3>
            <p className="text-black">You have the right to request that we correct any information you believe is inaccurate. You also have the right to request us to complete information you believe is incomplete.</p>
            
            <h3 className="text-black">6.3 Right to Erasure</h3>
            <p className="text-black">You have the right to request that we erase your personal information under certain conditions.</p>
            
            <h3 className="text-black">6.4 Right to Restrict Processing</h3>
            <p className="text-black">You have the right to request that we restrict the processing of your personal information under certain conditions.</p>
            
            <h3 className="text-black">6.5 Right to Object to Processing</h3>
            <p className="text-black">You have the right to object to our processing of your personal information under certain conditions.</p>
            
            <h3 className="text-black">6.6 Right to Data Portability</h3>
            <p className="text-black">You have the right to request that we transfer the information that we have collected to another organization, or directly to you, under certain conditions.</p>
            
            <h3 className="text-black">6.7 Right to Withdraw Consent</h3>
            <p className="text-black">If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time.</p>
            
            <h2 className="text-black">7. Children's Privacy</h2>
            <p className="text-black">Our Services are not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us. If we become aware that we have collected personal information from children without verification of parental consent, we take steps to remove that information from our servers.</p>
            
            <h2 className="text-black">8. Analytics</h2>
            <p className="text-black">We may use third-party Service providers to monitor and analyze the use of our Services.</p>
            
            <h3 className="text-black">8.1 Google Analytics</h3>
            <p className="text-black">Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Services. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.</p>
            <p className="text-black">You can opt-out of having your activity on the Services made available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js, and dc.js) from sharing information with Google Analytics about visits activity.</p>
            
            <h2 className="text-black">9. Behavioral Remarketing</h2>
            <p className="text-black">We use remarketing services to advertise on third-party websites to you after you visited our Services. We and our third-party vendors use cookies to inform, optimize, and serve ads based on your past visits to our Services.</p>
            
            <h3 className="text-black">9.1 Google Ads</h3>
            <p className="text-black">Google Ads remarketing service is provided by Google Inc.</p>
            <p className="text-black">You can opt-out of Google Analytics for Display Advertising and customize the Google Display Network ads by visiting the Google Ads Settings page.</p>
            
            <h3 className="text-black">9.2 Facebook</h3>
            <p className="text-black">Facebook remarketing service is provided by Facebook Inc.</p>
            <p className="text-black">You can learn more about interest-based advertising from Facebook by visiting this page. To opt-out from Facebook's interest-based ads, follow these instructions from Facebook.</p>
            
            <h2 className="text-black">10. Links to Other Websites</h2>
            <p className="text-black">Our Services may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
            <p className="text-black">We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
            
            <h2 className="text-black">11. Changes to This Privacy Policy</h2>
            <p className="text-black">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.</p>
            <p className="text-black">You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
            
            <h2 className="text-black">12. International Data Transfers</h2>
            <p className="text-black">Your information, including Personal Data, may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</p>
            <p className="text-black">If you are located outside Mongolia and choose to provide information to us, please note that we transfer the data, including Personal Data, to Mongolia and process it there.</p>
            <p className="text-black">Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
            <p className="text-black">We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</p>
            
            <h2 className="text-black">13. Deletion of Your Information</h2>
            <p className="text-black">If you would like to delete your account, you may do so by contacting us at privacy@mongoliabasketballdata.com. Upon receiving your request, we will begin the process of deleting your account from our systems. We will respond to your request within 14 days.</p>
            <p className="text-black">Please note that we may retain certain information as required by law or for legitimate business purposes. We may also retain cached or archived copies of your information for a reasonable period of time.</p>
            
            <h2 className="text-black">14. Do Not Track Features</h2>
            <p className="text-black">Most web browsers and some mobile operating systems include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.</p>
            
            <h2 className="text-black">15. Specific Rights for European Economic Area (EEA) Residents</h2>
            <p className="text-black">If you are a resident of the EEA, the legal basis for collecting and using your personal information described in this Privacy Policy depends on the Personal Information we collect and the specific context in which we collect it.</p>
            <p className="text-black">We may process your Personal Information because:</p>
            <ul className="text-black">
              <li className="text-black">We need to perform a contract with you;</li>
              <li className="text-black">You have given us permission to do so;</li>
              <li className="text-black">The processing is in our legitimate interests and it's not overridden by your rights;</li>
              <li className="text-black">To comply with the law.</li>
            </ul>
            
            <p className="text-black">If you are a resident of the EEA, you have certain data protection rights. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Information.</p>
            
            <h2 className="text-black">16. Specific Rights for California Residents</h2>
            <p className="text-black">If you are a California resident, you are entitled to specific privacy rights under the California Consumer Privacy Act (CCPA).</p>
            
            <h3 className="text-black">16.1 Right to Know About Personal Information Collected, Disclosed, or Sold</h3>
            <p className="text-black">You have the right to request that we disclose certain information to you about our collection and use of your personal information over the past 12 months.</p>
            
            <h3 className="text-black">16.2 Right to Delete Personal Information</h3>
            <p className="text-black">You have the right to request that we delete any of your personal information that we collected from you and retained, subject to certain exceptions.</p>
            
            <h3 className="text-black">16.3 Right to Opt-Out of the Sale of Personal Information</h3>
            <p className="text-black">If we sell your personal information, you have the right to opt-out of the sale of your information.</p>
            
            <h3 className="text-black">16.4 Right to Non-Discrimination</h3>
            <p className="text-black">We will not discriminate against you for exercising any of your CCPA rights.</p>
            
            <h2 className="text-black">17. Contact Us</h2>
            <p className="text-black">If you have any questions about this Privacy Policy, please contact us:</p>
            <ul className="text-black">
              <li className="text-black">By email: privacy@mongoliabasketballdata.com</li>
              <li className="text-black">By visiting this page on our website: www.mongoliabasketballdata.com/contact</li>
              <li className="text-black">By mail: Mongolia Basketball Data, 123 Main Street, Ulaanbaatar 14250, Mongolia</li>
            </ul>
            
            <h2 className="text-black">18. Data Retention</h2>
            <p className="text-black">We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
            <p className="text-black">We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of our Services, or we are legally obligated to retain this data for longer time periods.</p>
            
            <h2 className="text-black">19. Log Files</h2>
            <p className="text-black">Our Services use log files to collect information about visitors. Log files record internet protocol (IP) addresses, browser types, internet service provider (ISP), referring/exit pages, platform type, date/time stamp, and number of clicks. We utilize this information to analyze trends, administer the site, track user's movement in the aggregate, and gather broad demographic information for aggregate use.</p>
            
            <h2 className="text-black">20. Push Notifications</h2>
            <p className="text-black">We may send you push notifications through our mobile app. You may at any time opt out from receiving these types of communications by changing the settings on your mobile device.</p>
            
            <h2 className="text-black">21. Testimonials</h2>
            <p className="text-black">We display personal testimonials of satisfied customers on our Services. With your consent, we may post your testimonial along with your name. If you wish to update or delete your testimonial, you can contact us at privacy@mongoliabasketballdata.com.</p>
            
            <h2 className="text-black">22. Specific Data Collection Details</h2>
            <p className="text-black">Below, we provide additional details about the specific categories of personal information we collect and how we use that information.</p>
            
            <h3 className="text-black">22.1 Account Information</h3>
            <p className="text-black">When you create an account with us, we collect your name, email address, username, and password. We use this information to identify you, provide you with access to your account, and communicate with you about your account.</p>
            
            <h3 className="text-black">22.2 Payment Information</h3>
            <p className="text-black">If you purchase a premium subscription, we collect payment information, including credit card numbers, billing addresses, and other payment details. We use this information to process your payments and prevent fraudulent transactions. We work with payment processors who handle your payment information in accordance with industry standards.</p>
            
            <h3 className="text-black">22.3 User Activity Information</h3>
            <p className="text-black">We collect information about your interactions with our Services, such as the players you search for, the statistics you view, and your browsing behavior. We use this information to improve our Services, develop new features, and provide personalized recommendations.</p>
            
            <h3 className="text-black">22.4 Device Information</h3>
            <p className="text-black">We collect information about the devices you use to access our Services, including device model, operating system, unique device identifiers, and mobile network information. We use this information to optimize our Services for your device and troubleshoot issues.</p>
            
            <h2 className="text-black">23. Third-Party Advertising Partners</h2>
            <p className="text-black">We work with third-party advertising partners to show you ads that we think will be of interest to you. These advertising partners may set and access their own cookies, pixel tags, and similar technologies on our Services and they may otherwise collect or have access to information about you. We and our advertising partners may use this information to make the advertisements you see online more relevant to your interests.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
