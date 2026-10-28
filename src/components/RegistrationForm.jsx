import React, { useState } from 'react';

export default function RegistrationForm({ isAccessible }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required.';
    if (!formData.email.includes('@')) errs.email = 'Please provide a valid email address.';
    if (formData.password.length < 8) errs.password = 'Password must be at least 8 characters.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <div className="component-demo">
      <p className="demo-description">
        Tests form control labeling, error association (`aria-describedby`), `aria-invalid`, required field announcements, and autocomplete semantics.
      </p>

      {submitted ? (
        <div className="alert alert-success" role={isAccessible ? 'status' : undefined}>
          Registration successful! Form passed all checks.
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="form-stack">
          {/* 1. Name Field */}
          <div className="form-group">
            {isAccessible ? (
              <>
                <label htmlFor="user-full-name" className="form-label">
                  Full Name <span aria-hidden="true" className="required-star">*</span>
                </label>
                <input
                  id="user-full-name"
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  aria-required="true"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error-msg' : undefined}
                />
                {errors.name && (
                  <span id="name-error-msg" className="form-error-text" role="alert">
                    {errors.name}
                  </span>
                )}
              </>
            ) : (
              /* INACCESSIBLE:
                 - No <label> element or for/id association (just visual text)
                 - No aria-required
                 - Error message has no programmatic link (no aria-describedby, no aria-invalid)
                 - No autocomplete
              */
              <>
                <div className="form-label-fake">Full Name *</div>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && (
                  <div style={{ color: 'red', fontSize: '13px', marginTop: '4px' }}>
                    {errors.name}
                  </div>
                )}
              </>
            )}
          </div>

          {/* 2. Email Field */}
          <div className="form-group">
            {isAccessible ? (
              <>
                <label htmlFor="user-email-address" className="form-label">
                  Email Address <span aria-hidden="true" className="required-star">*</span>
                </label>
                <input
                  id="user-email-address"
                  type="email"
                  name="email"
                  autoComplete="email"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error-msg email-hint' : 'email-hint'}
                />
                <span id="email-hint" className="form-hint-text">
                  We will never share your email address.
                </span>
                {errors.email && (
                  <span id="email-error-msg" className="form-error-text" role="alert">
                    {errors.email}
                  </span>
                )}
              </>
            ) : (
              /* INACCESSIBLE: Uses placeholder as the only label */
              <>
                <input
                  type="text"
                  placeholder="Email Address (required)"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <div style={{ color: '#888', fontSize: '12px', marginTop: '4px' }}>
                  We will never share your email address.
                </div>
                {errors.email && (
                  <div style={{ color: 'red', fontSize: '13px', marginTop: '4px' }}>
                    {errors.email}
                  </div>
                )}
              </>
            )}
          </div>

          {/* 3. Password Field */}
          <div className="form-group">
            {isAccessible ? (
              <>
                <label htmlFor="user-new-password" className="form-label">
                  Create Password <span aria-hidden="true" className="required-star">*</span>
                </label>
                <input
                  id="user-new-password"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  className={`form-input ${errors.password ? 'input-error' : ''}`}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  aria-required="true"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'pwd-error-msg pwd-hint' : 'pwd-hint'}
                />
                <span id="pwd-hint" className="form-hint-text">
                  Must be at least 8 characters long.
                </span>
                {errors.password && (
                  <span id="pwd-error-msg" className="form-error-text" role="alert">
                    {errors.password}
                  </span>
                )}
              </>
            ) : (
              <>
                <div className="form-label-fake">Create Password *</div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="form-input"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {errors.password && (
                  <div style={{ color: 'red', fontSize: '13px', marginTop: '4px' }}>
                    {errors.password}
                  </div>
                )}
              </>
            )}
          </div>

          <div style={{ marginTop: '12px' }}>
            <button type="submit" className="btn btn-primary">
              Register Account
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
