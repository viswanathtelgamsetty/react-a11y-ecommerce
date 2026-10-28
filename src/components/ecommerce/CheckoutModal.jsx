import React, { useState, useRef, useEffect } from 'react';

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  totalAmount,
  isAccessible,
  highlightIssues,
  onOrderComplete,
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    shippingMethod: 'standard',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const modalRef = useRef(null);
  const errorSummaryRef = useRef(null);

  // Focus trap for modal in accessible mode
  useEffect(() => {
    if (!isOpen) return;
    if (isAccessible && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) focusable[0].focus();
    }
  }, [isOpen, isAccessible]);

  // Focus error summary if errors occur
  useEffect(() => {
    if (isAccessible && Object.keys(errors).length > 0 && errorSummaryRef.current) {
      errorSummaryRef.current.focus();
    }
  }, [errors, isAccessible]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email format';
    }
    if (!formData.address.trim()) errs.address = 'Street Address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.zip.trim()) errs.zip = 'Postal / Zip code is required';
    if (!formData.cardNumber.trim()) errs.cardNumber = 'Card number is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setIsSuccess(true);
    onOrderComplete();
  };

  const handleClose = () => {
    setIsSuccess(false);
    setErrors({});
    onClose();
  };

  return (
    <div
      className={`checkout-modal-backdrop ${isAccessible ? 'checkout-accessible-wrap' : 'checkout-inaccessible-wrap'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget && isAccessible) handleClose();
      }}
    >
      <div
        ref={modalRef}
        className={`checkout-dialog ${highlightIssues && !isAccessible ? 'a11y-flagged-container' : ''}`}
        role={isAccessible ? 'dialog' : undefined}
        aria-modal={isAccessible ? 'true' : undefined}
        aria-labelledby={isAccessible ? 'checkout-heading' : undefined}
      >
        <div className="checkout-dialog-header">
          <h2 id={isAccessible ? 'checkout-heading' : undefined} className="checkout-title">
            {isSuccess ? '🎉 Order Placed Successfully!' : '💳 Complete Your Order'}
          </h2>
          <button
            type="button"
            className="checkout-close-btn"
            onClick={handleClose}
            aria-label={isAccessible ? 'Close checkout modal' : undefined}
          >
            ✕
          </button>
        </div>

        {highlightIssues && !isAccessible && (
          <div className="a11y-pill-tag tag-banner">
            [WCAG 1.3.1, 3.3.1, 3.3.2: Missing &lt;label&gt; tags • Placeholders as fake labels • Errors unlinked to inputs]
          </div>
        )}

        {isSuccess ? (
          /* Order Confirmation View */
          <div className="order-confirmation-body">
            <div className="success-badge-circle" aria-hidden="true">✓</div>
            <h3>Thank you, {formData.fullName || 'Valued Customer'}!</h3>
            <p className="order-num-text">Order Confirmation: <strong>#AURA-{Math.floor(100000 + Math.random() * 900000)}</strong></p>
            <p className="order-email-text">
              We have sent a confirmation receipt and tracking link to <strong>{formData.email}</strong>.
            </p>

            <div className="order-summary-box">
              <h4>Order Breakdown:</h4>
              <ul>
                {items.map((item) => (
                  <li key={`${item.id}-${item.selectedColor}`}>
                    {item.quantity}x {item.name} ({item.selectedColor}) — ${(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <div className="order-total-highlight">
                Total Charged: <strong>${totalAmount.toFixed(2)}</strong>
              </div>
            </div>

            <button type="button" className="btn-primary" onClick={handleClose}>
              Back to Store
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} noValidate className="checkout-form-content">
            {/* Error summary for accessible mode */}
            {isAccessible && Object.keys(errors).length > 0 && (
              <div
                ref={errorSummaryRef}
                className="checkout-error-summary"
                role="alert"
                tabIndex={-1}
              >
                <h3>Please correct the {Object.keys(errors).length} errors below:</h3>
                <ul>
                  {Object.entries(errors).map(([field, msg]) => (
                    <li key={field}>
                      <a href={`#checkout-${field}`}>{msg}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section 1: Contact & Shipping */}
            <fieldset className="checkout-fieldset">
              <legend className="checkout-legend">1. Customer & Shipping Address</legend>

              {/* Full Name */}
              <div className="form-field-group">
                {isAccessible ? (
                  <>
                    <label htmlFor="checkout-fullName" className="field-label">
                      Full Name <span className="req-star" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="checkout-fullName"
                      name="fullName"
                      type="text"
                      className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={errors.fullName ? 'true' : 'false'}
                      aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                      autoComplete="name"
                    />
                    {errors.fullName && (
                      <span id="error-fullName" className="error-text" role="alert">
                        {errors.fullName}
                      </span>
                    )}
                  </>
                ) : (
                  /* Inaccessible: Missing <label>, placeholder as fake label, unlinked error */
                  <>
                    <div className="fake-label-row">
                      <span>Full Name *</span>
                      {highlightIssues && (
                        <span className="a11y-pill-tag tag-micro" title="WCAG 1.3.1: Missing <label htmlFor='...'> tag">
                          [No &lt;label&gt;]
                        </span>
                      )}
                    </div>
                    <input
                      name="fullName"
                      type="text"
                      className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                      placeholder="e.g. Alex Morgan"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && (
                      <div className="error-text-visual-only">
                        {errors.fullName}
                        {highlightIssues && (
                          <span className="a11y-pill-tag tag-micro" title="WCAG 3.3.1: Error text not linked via aria-describedby or aria-invalid">
                            [Unlinked Error]
                          </span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Email */}
              <div className="form-field-group">
                {isAccessible ? (
                  <>
                    <label htmlFor="checkout-email" className="field-label">
                      Email Address <span className="req-star" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="checkout-email"
                      name="email"
                      type="email"
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <span id="error-email" className="error-text" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <div className="fake-label-row">
                      <span>Email Address *</span>
                    </div>
                    <input
                      name="email"
                      type="email"
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      placeholder="alex.morgan@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="error-text-visual-only">{errors.email}</div>
                    )}
                  </>
                )}
              </div>

              {/* Street Address */}
              <div className="form-field-group">
                {isAccessible ? (
                  <>
                    <label htmlFor="checkout-address" className="field-label">
                      Street Address <span className="req-star" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="checkout-address"
                      name="address"
                      type="text"
                      className={`form-input ${errors.address ? 'input-error' : ''}`}
                      value={formData.address}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={errors.address ? 'true' : 'false'}
                      aria-describedby={errors.address ? 'error-address' : undefined}
                      autoComplete="street-address"
                    />
                    {errors.address && (
                      <span id="error-address" className="error-text" role="alert">
                        {errors.address}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <div className="fake-label-row">
                      <span>Street Address *</span>
                    </div>
                    <input
                      name="address"
                      type="text"
                      className={`form-input ${errors.address ? 'input-error' : ''}`}
                      placeholder="123 Audio Boulevard, Suite 400"
                      value={formData.address}
                      onChange={handleChange}
                    />
                    {errors.address && (
                      <div className="error-text-visual-only">{errors.address}</div>
                    )}
                  </>
                )}
              </div>

              {/* City & Zip Row */}
              <div className="form-row-two-col">
                <div className="form-field-group">
                  {isAccessible ? (
                    <>
                      <label htmlFor="checkout-city" className="field-label">City *</label>
                      <input
                        id="checkout-city"
                        name="city"
                        type="text"
                        className={`form-input ${errors.city ? 'input-error' : ''}`}
                        value={formData.city}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        aria-invalid={errors.city ? 'true' : 'false'}
                        autoComplete="address-level2"
                      />
                      {errors.city && <span className="error-text">{errors.city}</span>}
                    </>
                  ) : (
                    <>
                      <span>City *</span>
                      <input
                        name="city"
                        type="text"
                        className="form-input"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </>
                  )}
                </div>

                <div className="form-field-group">
                  {isAccessible ? (
                    <>
                      <label htmlFor="checkout-zip" className="field-label">Postal / Zip *</label>
                      <input
                        id="checkout-zip"
                        name="zip"
                        type="text"
                        className={`form-input ${errors.zip ? 'input-error' : ''}`}
                        value={formData.zip}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        aria-invalid={errors.zip ? 'true' : 'false'}
                        autoComplete="postal-code"
                      />
                      {errors.zip && <span className="error-text">{errors.zip}</span>}
                    </>
                  ) : (
                    <>
                      <span>Postal / Zip *</span>
                      <input
                        name="zip"
                        type="text"
                        className="form-input"
                        placeholder="Zip"
                        value={formData.zip}
                        onChange={handleChange}
                      />
                    </>
                  )}
                </div>
              </div>
            </fieldset>

            {/* Section 2: Payment Details */}
            <fieldset className="checkout-fieldset">
              <legend className="checkout-legend">2. Payment Information</legend>

              <div className="form-field-group">
                {isAccessible ? (
                  <>
                    <label htmlFor="checkout-card" className="field-label">Card Number *</label>
                    <input
                      id="checkout-card"
                      name="cardNumber"
                      type="text"
                      className="form-input"
                      placeholder="4000 1234 5678 9010"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      autoComplete="cc-number"
                    />
                  </>
                ) : (
                  <>
                    <span>Card Number *</span>
                    <input
                      name="cardNumber"
                      type="text"
                      className="form-input"
                      placeholder="4000 1234 5678 9010"
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                  </>
                )}
              </div>
            </fieldset>

            {/* Order Total Submit */}
            <div className="checkout-submit-row">
              <div className="checkout-final-total">
                <span>Total Due:</span>
                <strong>${totalAmount.toFixed(2)}</strong>
              </div>
              <button
                type="submit"
                className="btn-primary checkout-pay-btn"
                aria-label={isAccessible ? `Pay and place order for $${totalAmount.toFixed(2)}` : undefined}
              >
                Authorize & Place Order
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
