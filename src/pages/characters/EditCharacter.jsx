/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCharacterDetailsById } from '../../reducers/CharactersSlice';
import { Login } from '../login/Login';
import Select from 'react-select';
import {
  Button,
  FileInput,
  Label,
  Radio,
  Select as SelectFlowbite,
  TextInput,
  Textarea,
  Tooltip,
} from 'flowbite-react';
import { useTagsList } from '../../hooks/useCharactersjsx';

const EditCharacter = () => {
  const dispatch = useDispatch();
  const [charDetails, setCharDetails] = useState({});
  const { message, error, characterDetails } = useSelector(
    (state) => state.characters
  );

  const tagOptions = useTagsList();

  let { charId } = useParams();

  useEffect(() => {
    dispatch(getCharacterDetailsById(charId));
  }, [charId]);

  useEffect(() => {
    if (characterDetails && Object.keys(characterDetails).length) {
      setCharDetails(characterDetails?.details);
      console.log('charDetails -> ', charDetails);
    }
  }, [characterDetails]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [formData, setFormData] = useState({
    name: characterDetails?.details?.name,
    character_photo: characterDetails?.details?.character_photo,
    introduction: characterDetails?.details?.introduction,
    visibility: characterDetails?.details?.visibility,
    tags: characterDetails?.details?.tags,
    public_defination: characterDetails?.details?.public_defination,
    gender: characterDetails?.details?.gender,
    rating: characterDetails?.details?.rating,
    scenario: characterDetails?.details?.scenario,
    personality: characterDetails?.details?.personality,
    example_conversation: characterDetails?.details?.example_conversation,
    greeting: characterDetails?.details?.greeting,
  });

  useEffect(() => {
    if (error && message) {
      setErrorMessage(message);
    } else if (!error && message) {
      setSuccessMessage(message);
    }
  }, [message, error]);

  // const validateConversation = (conversation) => {
  //   const pattern = /^({{char}}:".*\n){{user}}:".*$/;
  //   return pattern.test(conversation)
  //     ? true
  //     : 'Expected input :\n {{char}}: " " {{user}}: " "';
  // };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
  } = useForm();

  const validateCharacterPhoto = (file) => {
    if (!file) {
      return 'Character Photo is required';
    }

    const allowedFormats = ['image/png', 'image/jpeg'];
    const fileType = file[0].type;

    if (!allowedFormats.includes(fileType)) {
      return 'Invalid file format. Only PNG, JPG, and JPEG images are allowed.';
    }
    return null;
  };

  useEffect(() => {
    // Set default values when characterDetails is available
    if (characterDetails && Object.keys(characterDetails).length) {
      const details = characterDetails.details;

      // Loop through each key and set the default value
      Object.keys(details).forEach((key) => {
        setValue(key, details[key]);
      });
    }
  }, [characterDetails, setValue]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('character_photo', data.character_photo[0]);
    formData.append('introduction', data.introduction);
    formData.append('visibility', data.visibility);
    formData.append('tags', data.tags.map((x) => x.toString()).toString());
    formData.append('public_defination', data.public_defination);
    formData.append('gender', data.gender);
    formData.append('rating', data.rating);
    formData.append('scenario', data.scenario);
    formData.append('personality', data.personality);
    formData.append('example_conversation', data.example_conversation);
    formData.append('greeting', data.greeting);

    // dispatch(createCharacter(formData));
  };

  useEffect(() => {
    if (error && message) {
      setErrorMessage(message);
    } else if (!error && message) {
      setSuccessMessage(message);
    }
  }, [message, error]);

  const token = localStorage.getItem('userToken');

  if (!token) {
    return <Login />;
  }
  return (
    <div className='create_character_wrap px-3 md:px-0 ml-0 md:ml-4'>
      <h1 className='text-3xl text-black font-medium mb-4'>Edit a Character</h1>
      <p className='text-red-800 font-medium pb-2'>
        We do not allow the following:
      </p>
      <p>- Visible genital exposure</p>
      <p>- Images of a real person or organization</p>
      <p>- Characters under 18 or any depictions of children</p>
      <p>
        For more information about Character creation, see{' '}
        <Link className='text-red-800 hover:text-black' to='/'>
          this guides
        </Link>
        .
      </p>
      <div className='py-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-5'>
            <div className='mb-2 block'>
              <label className='text-lg font-medium text-black'>
                Name<span className='text-red-800'>*</span>
              </label>
              <p className='text-gray-500 text-sm'>
                The name can include first and last names.
                <span className='text-red-800 font-medium'>
                  (3-20 characters)
                </span>
              </p>
            </div>
            <TextInput
              placeholder='Get your character a wonderful name'
              type='text'
              sizing='md'
              {...register('name', { required: 'Name is required' })}
            />
            <p className='text-gray-400 text-sm'>0 characters</p>
            {errors?.name?.message && (
              <h6 className='text-red-500'>{errors.name.message}</h6>
            )}
          </div>

          <div className='mb-5'>
            <div className='mb-2 block'>
              <label className='text-lg font-medium text-black'>
                Character Photo
              </label>
              <p className='text-gray-500 text-sm'>
                The avatar can be in a variety of formats{' '}
                <span className='text-red-800 font-medium'>
                  (png, gif, jpeg)
                </span>{' '}
                and ideally be a square aspect ratio image that is{' '}
                <span className='text-red-800 font-medium'>512x512</span>.
              </p>
            </div>
            <FileInput
              label='Character Photo'
              {...register('character_photo', {
                required: 'Character Photo is required',
                validate: validateCharacterPhoto,
              })}
            />
            {errors?.character_photo?.message && (
              <h6 className='text-red-500'>{errors.character_photo.message}</h6>
            )}
          </div>

          <div className='mb-5'>
            <div className='mb-2 block'>
              <label className='text-lg font-medium text-black'>
                Introduction<span className='text-red-800'>*</span>
              </label>
              <p className='text-gray-500 text-sm'>
                How would your Character describe themselves?
              </p>
              <p className='text-gray-500 text-sm'>
                This will be displayed in your character detail, not including
                in prompt or influence your character.
              </p>
              <p className='text-gray-500 text-sm flex'>
                If you want to public your character, it is better to write it
                down.
                <span className='text-red-800 font-medium flex'>
                  (3-200 characters)
                  <Tooltip content='Tooltip content' animation='duration-500'>
                    {/* <AiOutlineInfoCircle className='text-xl' /> */}
                  </Tooltip>
                </span>
              </p>
            </div>
            <TextInput
              placeholder='Get your character a wonderful name'
              type='text'
              sizing='md'
              {...register('introduction', {
                required: 'Introduction is required',
              })}
            />
            <p className='text-gray-400 text-sm'>0 characters</p>
            {errors?.introduction?.message && (
              <h6 className='text-red-500'>{errors.introduction.message}</h6>
            )}
          </div>

          <div className='mb-5'>
            <div className='mb-2 block'>
              <label className='text-lg font-medium text-black'>
                Visibility<span className='text-red-800'>*</span>
              </label>
              <p className='text-gray-500 text-sm'>
                Who is allowed to talk to them?
              </p>
              <p className='text-gray-500 text-sm'>
                If you are not the creator of this bot, please kindly set it as
                Private.
              </p>
              <p className='text-gray-500 text-sm'>
                We will need to set your bot to private or transfer it to the
                oriiginal creator if they request it.
              </p>
            </div>

            <div className='flex items-center gap-2 mb-2'>
              <Radio
                className='text-red-800 focus:ring-red-800'
                id='public'
                name='visibility'
                value={1}
                // checked={formData.visibility === 1}
                {...register('visibility')}
              />
              <Label htmlFor='public'>Public: Anyone can chat</Label>
            </div>
            <div className='flex items-center gap-2 mb-2'>
              <Radio
                className='text-red-800 focus:ring-red-800'
                id='unlisted'
                name='visibility'
                value={2}
                // checked={formData.visibility === 2}
              />
              <Label htmlFor='unlisted'>
                Unlisted: Anyone with the link can chat
              </Label>
            </div>
            <div className='flex items-center gap-2 mb-2'>
              <Radio
                className='text-red-800 focus:ring-red-800'
                id='private'
                name='visibility'
                value={3}
                // checked={formData.visibility === 3}
                {...register('visibility')}
              />
              <Label htmlFor='private'>Private: Only you can chat</Label>
            </div>
            {errors?.visibility?.message && (
              <h6 className='text-red-500'>{errors.visibility.message}</h6>
            )}
          </div>

          <div className='mb-5'>
            <div className='mb-2 block'>
              <label className='text-lg font-medium text-black'>Tags</label>
              {/* <p className='text-gray-500 text-sm'>
                Up to five tags can be selected.
              </p> */}
            </div>

            {tagOptions && (
              <Controller
                name='tags[]'
                control={control}
                defaultValue={formData.tags}
                rules={{ required: 'Tag is required' }}
                render={({ field, value, ref }) => (
                  <Select
                    isMulti
                    ref={ref}
                    options={tagOptions}
                    value={value}
                    onChange={(val) => {
                      field.onChange(val.map((v) => v.value));
                      // field.isOptionsDisabled = field.disabled =
                      //   field?.value?.length > 5;
                    }}
                    // isOptionDisabled={() => field?.value?.length >= 5}
                  />
                )}
              />
            )}
            {errors?.tags?.message && (
              <h6 className='text-red-500'>{errors.tags.message}</h6>
            )}
          </div>

          <div className='mb-5'>
            <div className='mb-2 block'>
              <label className='text-lg font-medium text-black'>
                Rating<span className='text-red-800'>*</span>
              </label>
            </div>
            <div className='flex'>
              <div className='flex items-center gap-2 mb-1 mr-4'>
                <div className='flex items-center gap-2'>
                  <Radio
                    className='text-red-800 focus:ring-red-800'
                    id='s1'
                    name='rating'
                    value='SFW'
                    checked={formData.rating === 'SFW'}
                    {...register('rating')}
                  />
                  <Label htmlFor='s1'>SFW</Label>
                </div>
              </div>
              <div className='flex items-center gap-2 mb-1 mr-4'>
                <div className='flex items-center gap-2'>
                  <Radio
                    className='text-red-800 focus:ring-red-800'
                    id='n1'
                    name='rating'
                    value='NSFW'
                    checked={formData.rating === 'NSFW'}
                    {...register('rating')}
                  />
                  <Label htmlFor='n1'>NSFW</Label>
                </div>
              </div>
              {errors?.rating?.message && (
                <h6 className='text-red-500'>{errors.rating.message}</h6>
              )}
            </div>
          </div>

          <div className='mb-5'>
            <div className='mb-2 block'>
              <label className='text-lg font-medium text-black'>
                Gender<span className='text-red-800'>*</span>
              </label>
              <p className='text-gray-500 text-sm'>What is your OC’s gender?</p>
            </div>
            <SelectFlowbite
              defaultValue={formData.gender}
              {...register('gender', {
                required: 'Select one option',
              })}
            >
              <option value=''>Choose gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Non_binary'>Non-binary</option>
            </SelectFlowbite>
            {errors?.gender?.message && (
              <h6 className='text-red-500'>{errors.gender.message}</h6>
            )}
          </div>

          <h2 className='text-2xl text-red-800 font-medium mb-4'>
            Character Definition
          </h2>
          <div className='mb-5'>
            <div className='mb-2 block'>
              <label className='text-lg font-medium text-black'>
                Public definition?<span className='text-red-800'>*</span>
              </label>
              <p className='text-gray-500 text-sm'>
                If you choose to make it public, this character definition will
                be displayed on the character details page.
              </p>
            </div>
            <div className='flex'>
              <div className='flex items-center gap-2 mb-1 mr-4'>
                <Radio
                  className='text-red-800 focus:ring-red-800'
                  id='yes'
                  name='public-definition'
                  value='Yes'
                  checked={formData.public_defination === 'Yes'}
                  {...register('public_defination')}
                />
                <Label htmlFor='yes'>Yes</Label>
              </div>
              <div className='flex items-center gap-2 mb-1 mr-4'>
                <Radio
                  className='text-red-800 focus:ring-red-800'
                  id='no'
                  name='public-definition'
                  value='No'
                  checked={formData.public_defination === 'No'}
                  {...register('public_defination')}
                />
                <Label htmlFor='no'>No</Label>
              </div>
              {errors?.publicDefinition?.message && (
                <h6 className='text-red-500'>
                  {errors.publicDefinition.message}
                </h6>
              )}
            </div>
          </div>

          <div className='mb-5'>
            <div className='mb-2 block'>
              <label className='text-lg font-medium text-black'>
                Greeting<span className='text-red-800'>*</span>
              </label>
              <p className='text-gray-500 text-sm flex'>
                What would say to start a conversation?
                <span className='text-red-800 font-medium flex'>
                  (3-1000 characters)
                  <Tooltip content='Tooltip content' animation='duration-500'>
                    {/* <AiOutlineInfoCircle className='text-xl' /> */}
                  </Tooltip>
                </span>
              </p>
            </div>
            <Textarea
              id='comment'
              placeholder='e.g. Hello User Name, how are you today?'
              rows={3}
              {...register('greeting', { required: 'Greeting is required' })}
            />
            <p className='text-gray-400 text-sm'>0 characters</p>
            {errors?.greeting?.message && (
              <h6 className='text-red-500'>{errors.greeting.message}</h6>
            )}
          </div>

          <div className='mb-5'>
            <div className='mb-2 block'>
              <label className='text-lg font-medium text-black'>
                Personality<span className='text-red-800'>*</span>
              </label>
              <p className='text-gray-500 text-sm flex'>
                In just a few sentences, how would they describe themselves?
                <span className='text-red-800 font-medium flex'>
                  (0-4000 characters)
                  <Tooltip content='Tooltip content' animation='duration-500'>
                    {/* <AiOutlineInfoCircle className='text-xl' /> */}
                  </Tooltip>
                </span>
              </p>
            </div>
            <Textarea
              id='personality'
              placeholder='The Long Description allows you to have the Character describe themselves (traits, history, mannerisms, etc) and the kinds of things they want to talk about.'
              rows={5}
              {...register('personality', {
                required: 'Personality is required',
              })}
            />
            <p className='text-gray-400 text-sm'>0 characters</p>
            {errors?.personality?.message && (
              <h6 className='text-red-500'>{errors.personality.message}</h6>
            )}
          </div>

          <div className='mb-5'>
            <div className='mb-2 block'>
              <label className='text-lg font-medium text-black'>
                Scenario<span className='text-red-800'>*</span>
              </label>
              <p className='text-gray-500 text-sm flex'>
                The current circumstances and context of the conversation and
                the characters.
                <span className='text-red-800 font-medium flex'>
                  (0-1000 characters)
                  <Tooltip content='Tooltip content' animation='duration-500'>
                    {/* <AiOutlineInfoCircle className='text-xl' /> */}
                  </Tooltip>
                </span>
              </p>
            </div>
            <Textarea
              id='scenario'
              placeholder='Describe the environment the Character is in.'
              rows={5}
              {...register('scenario', { required: 'Scenario is required' })}
            />
            <p className='text-gray-400 text-sm'>0 characters</p>
            {errors?.scenario?.message && (
              <h6 className='text-red-500'>{errors.scenario.message}</h6>
            )}
          </div>

          <div className='mb-5'>
            <div className='mb-2 block'>
              <label className='text-lg font-medium text-black'>
                Example conversation
              </label>
              <p className='text-gray-500 text-sm'>
                Example conversations and information to define your Character.
                The first 15-30 messages are the most important. See{' '}
                <span className='text-red-800 font-medium flex'>
                  this guide.(0-3500 characters)
                  <Tooltip content='Tooltip content' animation='duration-500'>
                    {/* <AiOutlineInfoCircle className='text-xl' /> */}
                  </Tooltip>
                </span>
              </p>
            </div>
            <Textarea
              id='example_conversation'
              placeholder='Describe the environment the Character is in.'
              rows={8}
              {...register('example_conversation', {
                required: 'Example Conversation is required',
                // validate: validateConversation,
              })}
            />
            <p className='text-gray-400 text-sm'>0 characters</p>
            {errors?.example_conversation?.message && (
              <h6 className='text-red-500'>
                {errors.example_conversation.message}
              </h6>
            )}
          </div>
          <Button
            className='create_character_btn w-full text-black'
            type='submit'
          >
            Submit
          </Button>
          {successMessage && (
            <div
              className='p-4 mb-4 text-sm text-green-800 capitalize rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400'
              role='alert'
            >
              <span className='font-medium'>{successMessage}</span>
            </div>
          )}
          {errorMessage && (
            <div
              className='w-full p-4 mb-4 text-sm text-red-800 capitalize rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
              role='alert'
            >
              <span className='font-medium'>{errorMessage}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditCharacter;
