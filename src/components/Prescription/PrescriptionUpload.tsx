import React, { useState } from 'react';
import { Upload, Camera, FileText, Loader, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const PrescriptionUpload: React.FC = () => {
  const { t, addMedicine } = useApp();
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<{
    text: string;
    instructions: string;
    medicines: Array<{
      name: string;
      dosage: string;
      times: string[];
      foodInstruction: 'before' | 'after' | 'with' | 'empty';
      duration: number;
    }>;
  } | null>(null);

  // Simulate more realistic OCR processing based on common prescription formats
  const simulateOCR = async (file: File) => {
    // Create a preview URL for the uploaded image
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    // More realistic prescription text patterns
    const prescriptionVariants = [
      {
        text: `Dr. Rajesh Kumar, MBBS, MD
City Hospital, Mumbai
Date: ${new Date().toLocaleDateString()}

Patient: John Doe
Age: 45 years

Rx:
1. Tab Paracetamol 500mg
   Sig: 1 tab BD PC x 5 days
   
2. Cap Amoxicillin 500mg  
   Sig: 1 cap TDS AC x 7 days
   
3. Tab Omeprazole 20mg
   Sig: 1 tab OD empty stomach x 14 days

4. Syp Cough Relief 100ml
   Sig: 2 tsp TDS PC x 3 days

Next visit: After 1 week
Dr. Signature`,
        medicines: [
          {
            name: 'Paracetamol 500mg',
            dosage: '1 tablet',
            times: ['09:00', '21:00'],
            foodInstruction: 'after' as const,
            duration: 5
          },
          {
            name: 'Amoxicillin 500mg',
            dosage: '1 capsule',
            times: ['08:00', '14:00', '20:00'],
            foodInstruction: 'before' as const,
            duration: 7
          },
          {
            name: 'Omeprazole 20mg',
            dosage: '1 tablet',
            times: ['07:00'],
            foodInstruction: 'empty' as const,
            duration: 14
          },
          {
            name: 'Cough Relief Syrup',
            dosage: '2 teaspoons',
            times: ['08:00', '14:00', '20:00'],
            foodInstruction: 'after' as const,
            duration: 3
          }
        ]
      },
      {
        text: `Apollo Clinic
Dr. Priya Sharma, MD (Internal Medicine)
Reg. No: 12345

Patient: Mrs. Sunita Patel
Age: 62 years, Female

Diagnosis: Hypertension, Diabetes Type 2

Prescription:
1. Tab Amlodipine 5mg - 1 tab OD morning
2. Tab Metformin 500mg - 1 tab BD with meals  
3. Tab Atorvastatin 10mg - 1 tab HS
4. Tab Aspirin 75mg - 1 tab OD after breakfast

Duration: 30 days
Follow up: After 1 month

Doctor's Signature & Stamp`,
        medicines: [
          {
            name: 'Amlodipine 5mg',
            dosage: '1 tablet',
            times: ['08:00'],
            foodInstruction: 'with' as const,
            duration: 30
          },
          {
            name: 'Metformin 500mg',
            dosage: '1 tablet',
            times: ['09:00', '21:00'],
            foodInstruction: 'with' as const,
            duration: 30
          },
          {
            name: 'Atorvastatin 10mg',
            dosage: '1 tablet',
            times: ['22:00'],
            foodInstruction: 'after' as const,
            duration: 30
          },
          {
            name: 'Aspirin 75mg',
            dosage: '1 tablet',
            times: ['09:00'],
            foodInstruction: 'after' as const,
            duration: 30
          }
        ]
      },
      {
        text: `Max Healthcare
Dr. Amit Singh, MBBS, MS (Ortho)

Patient: Mr. Ravi Kumar
Age: 35 years

Post-Surgery Care:

1. Tab Diclofenac 50mg
   1 tab BD after food x 7 days
   
2. Tab Pantoprazole 40mg
   1 tab OD empty stomach x 10 days
   
3. Cap Pregabalin 75mg
   1 cap BD x 5 days
   
4. Ointment Volini
   Apply locally TDS

Instructions:
- Complete bed rest for 3 days
- Ice application 3-4 times daily
- Follow up after 1 week

Dr. Signature`,
        medicines: [
          {
            name: 'Diclofenac 50mg',
            dosage: '1 tablet',
            times: ['09:00', '21:00'],
            foodInstruction: 'after' as const,
            duration: 7
          },
          {
            name: 'Pantoprazole 40mg',
            dosage: '1 tablet',
            times: ['07:00'],
            foodInstruction: 'empty' as const,
            duration: 10
          },
          {
            name: 'Pregabalin 75mg',
            dosage: '1 capsule',
            times: ['09:00', '21:00'],
            foodInstruction: 'with' as const,
            duration: 5
          }
        ]
      }
    ];

    // Randomly select one of the prescription variants
    const selectedPrescription = prescriptionVariants[Math.floor(Math.random() * prescriptionVariants.length)];

    // Generate instructions based on the extracted medicines
    const instructions = selectedPrescription.medicines.map((med, index) => {
      const timesText = med.times.length === 1 ? 'once daily' : 
                       med.times.length === 2 ? 'twice daily' : 
                       'three times daily';
      
      const foodText = med.foodInstruction === 'before' ? 'before meals' :
                       med.foodInstruction === 'after' ? 'after meals' :
                       med.foodInstruction === 'with' ? 'with meals' :
                       'on empty stomach';

      return `${index + 1}. Take ${med.name} - ${med.dosage} ${timesText} ${foodText} for ${med.duration} days`;
    }).join('\n');

    return {
      text: selectedPrescription.text,
      instructions,
      medicines: selectedPrescription.medicines
    };
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setExtractedData(null);
    
    try {
      const ocrResult = await simulateOCR(file);
      setExtractedData(ocrResult);
    } catch (error) {
      console.error('OCR processing failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleAddToSchedule = () => {
    if (extractedData?.medicines) {
      extractedData.medicines.forEach(medicine => {
        addMedicine({
          name: medicine.name,
          dosage: medicine.dosage,
          times: medicine.times,
          foodInstruction: medicine.foodInstruction,
          duration: medicine.duration,
          daysLeft: medicine.duration
        });
      });
      
      // Show success message
      alert(t('prescriptionUploaded'));
      
      // Reset the form
      setExtractedData(null);
      setUploadedImage(null);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('prescription')}</h1>
        <p className="text-gray-600">Upload your prescription for easy medication management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('uploadPrescription')}</h2>
          
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <Loader className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <p className="text-gray-600 mb-2">{t('processing')}</p>
                <p className="text-sm text-gray-500">Extracting text from prescription...</p>
              </div>
            ) : uploadedImage ? (
              <div className="flex flex-col items-center">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded prescription" 
                  className="max-w-full max-h-48 object-contain rounded-lg mb-4"
                />
                <div className="flex items-center text-green-600 mb-2">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Prescription uploaded successfully</span>
                </div>
                <button
                  onClick={() => {
                    setUploadedImage(null);
                    setExtractedData(null);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Upload different prescription
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-gray-600 mb-4">{t('dragDrop')}</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  {t('uploadImage')}
                </label>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Camera className="w-5 h-5" />
              <span className="text-sm">Take Photo</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <FileText className="w-5 h-5" />
              <span className="text-sm">Upload File</span>
            </div>
          </div>
        </div>

        {extractedData && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Extracted Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{t('extractedText')}</h3>
                <div className="bg-gray-50 p-4 rounded-lg max-h-48 overflow-y-auto">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">{extractedData.text}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">{t('instructions')}</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <pre className="text-sm text-blue-800 whitespace-pre-wrap">{extractedData.instructions}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Detected Medicines ({extractedData.medicines.length})</h3>
                <div className="space-y-3">
                  {extractedData.medicines.map((medicine, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-green-800">{medicine.name}</h4>
                          <p className="text-sm text-green-700">
                            {medicine.dosage} • {medicine.times.length}x daily • {medicine.duration} days
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            Times: {medicine.times.join(', ')} • {medicine.foodInstruction === 'before' ? 'Before meals' : 
                                   medicine.foodInstruction === 'after' ? 'After meals' :
                                   medicine.foodInstruction === 'with' ? 'With meals' : 'Empty stomach'}
                          </p>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleAddToSchedule}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
              >
                Add All Medicines to Schedule
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionUpload;