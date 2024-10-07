/* eslint-disable jsx-a11y/media-has-caption */
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import { FaUpload } from 'react-icons/fa';

interface ImageUploadProps {
    name: string;
}

export default function ImageUpload({ name }: ImageUploadProps) {
    const { setValue, watch } = useFormContext();
    const [filePreviews, setFilePreviews] = useState<string[]>([]);


    const files = watch(name);


    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);

        const existingFiles = files || [];
        const allFiles = [...existingFiles, ...selectedFiles];

        setValue(name, allFiles);

        const previews = allFiles.map(file => URL.createObjectURL(file));

        setFilePreviews(previews);
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = files.filter((_: File, i: number) => i !== index);

        setValue(name, updatedFiles);

        const updatedPreviews = updatedFiles.map((file: any) => URL.createObjectURL(file));

        setFilePreviews(updatedPreviews);
    };

    return (
        <div>
            <input
                multiple
                accept="image/*, video/*"
                className="hidden" // Hide the default file input
                type="file"
                id="file-upload"
                onChange={handleFileUpload}
            />
            <label
                htmlFor="file-upload"
                className="flex items-center w-full border p-4 rounded-xl text-sm cursor-pointer font-semibold text-blue-700 bg-blue-100">
                <FaUpload className="mr-2" /> 
                {filePreviews.length ? "Upload More" : "Upload Images"}
            </label>

            {/* preview */}
            {filePreviews.length > 0 && (
                <div className='mt-3 grid grid-cols-4 gap-4'>
                    {filePreviews.map((preview, index) => (
                        <div key={index} className="relative w-32 h-32 object-cover rounded-md">
                            {/* Remove icon */}
                            <button
                                className="absolute top-1 right-1 p-1 bg-default-600/50 text-white rounded-full"
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                            >
                                <FiX size={16} />
                            </button>

                            {preview.endsWith(".mp4") || preview.endsWith(".avi") || preview.endsWith(".mov") ? (
                                <video controls className="w-full h-full object-cover rounded-md" src={preview} />
                            ) : (
                                <img alt={`Preview ${index}`} className="w-full h-full object-cover rounded-md" src={preview} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
