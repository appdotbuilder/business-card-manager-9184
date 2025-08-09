<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBusinessCardRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'company_id' => 'required|exists:companies,id',
            'template' => 'required|string|in:default,modern,classic,creative',
            'colors' => 'nullable|array',
            'colors.primary' => 'nullable|string',
            'colors.secondary' => 'nullable|string',
            'colors.accent' => 'nullable|string',
            'custom_fields' => 'nullable|array',
            'is_default' => 'boolean',
            'is_public' => 'boolean',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'user_id.required' => 'Please select a user for the business card.',
            'user_id.exists' => 'The selected user is invalid.',
            'company_id.required' => 'Please select a company.',
            'company_id.exists' => 'The selected company is invalid.',
            'template.required' => 'Please select a template.',
            'template.in' => 'The selected template is not available.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'is_default' => $this->boolean('is_default', true),
            'is_public' => $this->boolean('is_public', true),
        ]);
    }
}