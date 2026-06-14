import { useState } from "react";
import { useNavigate } from "react-router";
import { Building, Home, MapPin, FileText, Upload, CreditCard, CheckCircle, X } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';
import { usePackages } from '../../../hooks/usePackages';
import { useCreateRequest } from '../../../hooks/useRequests';
import { useUploadDocument } from '../../../hooks/useDocuments';

export function CreateRequest() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: "",
    location: "",
    address: "",
    price: "",
    servicePackage: "",
    documents: {} as Record<string, File>,
  });

  const { data: packagesData, isLoading: packagesLoading } = usePackages();
  const { mutateAsync: createRequest, isPending: isCreating } = useCreateRequest();
  const { mutateAsync: uploadDocument, isPending: isUploading } = useUploadDocument();

  const isSubmitting = isCreating || isUploading;
  const isAr = i18n.language === 'ar';

  const propertyTypes = [
    { value: "apartment", label: t('request.apartment'), icon: Building },
    { value: "villa", label: t('request.villa'), icon: Home },
    { value: "land", label: t('request.land'), icon: MapPin },
    { value: "commercial", label: t('request.commercial'), icon: Building },
  ];

  const propertyTypeMap: Record<string, number> = {
    apartment: 0,
    villa: 1,
    land: 2,
    commercial: 3,
  };

  const packages = packagesData || [];
  const selectedPackage = packages.find(p => String(p.id) === formData.servicePackage);

  // Required document keys depend on the selected package's expert role
  const getRequiredDocKeys = (): string[] => {
    if (!selectedPackage) return [];

    const name = selectedPackage.name.toLowerCase();

    // Engineering Inspection: on-site visit only, no documents needed
    if (selectedPackage.requiredExpertRole === 'Engineer') {
      return [];
    }

    // Government Verification: government-related docs
    if (name.includes('government') || name.includes('حكومي')) {
      return ['govLandRegistry', 'govTaxClearance', 'govZoningCert', 'govMunicipalApproval'];
    }

    // Contract Review: legal/contract docs
    if (name.includes('contract') || name.includes('عقود')) {
      return ['propertyContract', 'titleDeed', 'nationalId'];
    }

    // Consultation: just the contract is enough
    return ['propertyContract'];
  };

  const handleSubmit = async () => {
    try {
      if (!selectedPackage) return;

      const result = await createRequest({
        propertyType: propertyTypeMap[formData.propertyType] ?? 0,
        location: formData.location,
        address: formData.address,
        propertyPrice: Number(formData.price) || 0,
        servicePackageId: selectedPackage.id,
      });

      const files = Object.values(formData.documents);
      if (files.length > 0 && result?.id) {
        for (const file of files) {
          await uploadDocument({ requestId: result.id, file });
        }
      }

      toast.success(t('request.submitSuccess'));
      setTimeout(() => navigate("/customer"), 2000);
    } catch {
      toast.error(t('request.submitError', { defaultValue: 'Failed to submit request. Please try again.' }));
    }
  };

  const handleDocFileChange = (docKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, documents: { ...formData.documents, [docKey]: e.target.files[0] } });
    }
  };

  const removeDocFile = (docKey: string) => {
    const { [docKey]: _, ...rest } = formData.documents;
    setFormData({ ...formData, documents: rest });
  };

  const stepLabels = [
    t('request.package'),
    t('request.propertyType'),
    t('request.details'),
    t('request.documents'),
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= s ? "bg-[#059669] text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 4 && (
                <div className={`flex-1 h-1 mx-2 ${step > s ? "bg-[#059669]" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm">
          {stepLabels.map((label, i) => (
            <span key={i} className={step >= i + 1 ? "text-foreground font-medium" : "text-muted-foreground"}>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 border border-border shadow-sm">
        {/* Step 1: Select Package */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('request.selectPackage')}</h2>
            <p className="text-muted-foreground mb-6">{t('request.selectPackageDesc')}</p>

            {packagesLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-muted-foreground">{t('common.loading')}</div>
              </div>
            ) : (
              <div className="space-y-4">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setFormData({ ...formData, servicePackage: String(pkg.id) })}
                    className={`w-full p-6 border-2 rounded-xl text-left transition-all hover:shadow-md ${
                      formData.servicePackage === String(pkg.id)
                        ? "border-[#059669] bg-emerald-50"
                        : "border-border hover:border-gray-300"
                    } ${pkg.isPopular ? "relative" : ""}`}
                  >
                    {pkg.isPopular && (
                      <span className="absolute -top-3 right-4 px-3 py-1 bg-[#059669] text-white text-xs rounded-full">
                        {t('common.recommended')}
                      </span>
                    )}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{isAr ? pkg.nameAr : pkg.name}</h3>
                        <p className="text-sm text-muted-foreground">{isAr ? pkg.descriptionAr : pkg.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold text-[#059669]">{t('common.egp')} {pkg.price.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(isAr ? pkg.featuresAr : pkg.features).map((feature, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-white rounded-full border border-border">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-end mt-8">
              <button
                onClick={() => setStep(2)}
                disabled={!formData.servicePackage}
                className="px-6 py-2.5 bg-[#059669] text-white rounded-lg hover:bg-[#047857] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {t('common.continue')}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Property Type */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('request.selectPropertyType')}</h2>
            <p className="text-muted-foreground mb-6">{t('request.selectPropertyTypeDesc')}</p>

            <div className="grid md:grid-cols-2 gap-4">
              {propertyTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setFormData({ ...formData, propertyType: type.value })}
                    className={`p-6 border-2 rounded-xl text-left transition-all hover:shadow-md ${
                      formData.propertyType === type.value
                        ? "border-[#059669] bg-emerald-50"
                        : "border-border hover:border-gray-300"
                    }`}
                  >
                    <Icon className={`w-8 h-8 mb-3 ${
                      formData.propertyType === type.value ? "text-[#059669]" : "text-muted-foreground"
                    }`} />
                    <div className="font-semibold text-lg">{type.label}</div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                {t('common.back')}
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.propertyType}
                className="px-6 py-2.5 bg-[#059669] text-white rounded-lg hover:bg-[#047857] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {t('common.continue')}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Property Details */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('request.propertyDetails')}</h2>
            <p className="text-muted-foreground mb-6">{t('request.propertyDetailsDesc')}</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('request.location')} *</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                >
                  <option value="">{t('locations.selectLocation')}</option>
                  <option value="cairo">{t('locations.cairo')}</option>
                  <option value="giza">{t('locations.giza')}</option>
                  <option value="alexandria">{t('locations.alexandria')}</option>
                  <option value="new-cairo">{t('locations.newCairo')}</option>
                  <option value="6-october">{t('locations.october')}</option>
                  <option value="north-coast">{t('locations.northCoast')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('request.address')} *</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] resize-none"
                  placeholder={t('request.addressPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('request.price')}</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                  placeholder={t('request.pricePlaceholder')}
                />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                {t('common.back')}
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!formData.location || !formData.address}
                className="px-6 py-2.5 bg-[#059669] text-white rounded-lg hover:bg-[#047857] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {t('common.continue')}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Upload Documents (based on selected package) */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('request.uploadDocuments')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('request.uploadDocsForPackage')}
            </p>

            {/* Separate upload field for each required document */}
            {getRequiredDocKeys().length === 0 && (
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl text-center">
                <MapPin className="w-10 h-10 text-[#1e3a8a] mx-auto mb-3" />
                <h4 className="font-medium text-[#1e3a8a] mb-1">{t('request.siteVisitOnly')}</h4>
                <p className="text-sm text-muted-foreground">{t('request.siteVisitDesc')}</p>
              </div>
            )}
            <div className="space-y-4">
              {getRequiredDocKeys().map((docKey) => {
                const file = formData.documents[docKey];
                return (
                  <div key={docKey} className="p-4 border border-border rounded-lg">
                    <label className="block text-sm font-medium mb-2">
                      {t(`request.${docKey}`)}
                    </label>
                    {file ? (
                      <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                        <FileText className="w-5 h-5 text-[#059669] flex-shrink-0" />
                        <span className="text-sm flex-1 truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                        <button
                          onClick={() => removeDocFile(docKey)}
                          className="p-1 hover:bg-red-50 rounded text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="file"
                          onChange={(e) => handleDocFileChange(docKey, e)}
                          className="hidden"
                          id={`file-${docKey}`}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <label
                          htmlFor={`file-${docKey}`}
                          className="flex items-center gap-3 p-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-[#059669] transition-colors"
                        >
                          <Upload className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{t('request.chooseFile')}</span>
                        </label>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Secure payment info */}
            <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl border border-border">
              <div className="flex items-start gap-4">
                <CreditCard className="w-6 h-6 text-[#1e3a8a] flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2">{t('request.securePayment')}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t('request.securePaymentDesc')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-white rounded-full border border-border">Visa</span>
                    <span className="text-xs px-2 py-1 bg-white rounded-full border border-border">Mastercard</span>
                    <span className="text-xs px-2 py-1 bg-white rounded-full border border-border">InstaPay</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors"
                disabled={isSubmitting}
              >
                {t('common.back')}
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#059669] text-white rounded-lg hover:bg-[#047857] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? t('common.loading') : t('request.submitAndPay')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
