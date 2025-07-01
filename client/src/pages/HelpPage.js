import React from 'react';
import { Link } from 'react-router-dom';
import './HelpPage.css';

function HelpPage() {
  return (
    <div className="help-container">
      <div className="help-back-btn">
        <Link to="/" className="back-link">← Back</Link>
      </div>

      <h1>Help & Support</h1>
      <p>If you're facing any issues using the Dictionary Management Platform, you're in the right place.</p>

      <h2>Frequently Asked Questions</h2>
      <ul>
        <li>
          <strong>How do I post an article?</strong><br />
          Click on the "Post Your Experience" link and fill out the form.
        </li>
        <li>
          <strong>Do I need to create an account?</strong><br />
          You can explore without logging in, but posting requires authentication.
        </li>
        <li>
          <strong>Can I edit or delete my posts?</strong><br />
          Yes, just navigate to your profile and you'll see all your contributions.
        </li>
      </ul>

      <h2>Admin Panel – What Can Admins Do?</h2>
      <ul>
        <li>✅ Access all user-submitted posts and profiles.</li>
        <li>🛠️ Edit or remove inappropriate or duplicate content.</li>
        <li>🔒 Approve or reject new posts before they go live.</li>
        <li>👥 Manage users, including promoting to admin or banning accounts.</li>
        <li>📊 View analytics and performance statistics of the platform.</li>
      </ul>

      <h2>Client Panel – What Can Users Do?</h2>
      <ul>
        <li>📝 Create and submit your own posts or experiences.</li>
        <li>🔍 Explore existing posts using the search feature.</li>
        <li>⭐ Save, bookmark, or react to useful content (coming soon).</li>
        <li>✏️ Edit your previously submitted posts.</li>
        <li>👤 Manage your profile and track your contributions.</li>
      </ul>

      
      <h2>Need More Help?</h2>
      <p>If your question isn’t listed above, please reach out to our support team at <a href="mailto:support@wikidictionary.com">support@wikidictionary.com</a>.</p>
    </div>

    
  );
}

export default HelpPage;
