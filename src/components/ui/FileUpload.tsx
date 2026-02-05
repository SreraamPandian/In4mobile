import React, { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle } from 'lucide-react';

interface FileUploadProps {
    label?: string;
    onFileSelect: (file: File | null) => void;
    accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label = "Upload File", onFileSelect, accept = ".pdf,.jpg,.jpeg,.png" }) => {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (selectedFile: File) => {
        setFile(selectedFile);
        onFileSelect(selectedFile);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
        onFileSelect(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="w-full group">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 group-hover:text-gray-500 transition-colors">
                {label}
            </label>

            <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
                    ${isDragging
                        ? 'border-primary bg-primary/5'
                        : file
                            ? 'border-green-500/50 bg-green-50'
                            : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    }
                `}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleChange}
                    accept={accept}
                    className="hidden"
                />

                <div className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                    {file ? (
                        <>
                            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                <FileText size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-800 truncate max-w-[200px]">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                            </div>
                            <button
                                onClick={removeFile}
                                className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </>
                    ) : (
                        <>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDragging ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                                <Upload size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">Click to upload or drag & drop</p>
                                <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
