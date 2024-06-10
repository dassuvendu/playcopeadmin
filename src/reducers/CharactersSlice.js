import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import errorHandler from '../store/errorHandler';
import api from '../store/api';

// Get Characters List | Mehtod: POST
export const fetchCharactersList = createAsyncThunk(
  'characters/fetchCharactersList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/admin/characters');
      if (response?.data?.status_code === 200) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

// Update Status | Mehtod: POST
export const updateStatus = createAsyncThunk(
  'characters/updateStatus',
  async ({ entity, char_id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('/admin/editors-choice', {
        entity: entity,
        char_id: char_id,
      });
      if (response?.data?.status_code === 200) {
        dispatch(fetchCharactersList());
        return response.data.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

// Delete Characters | Method: POST
export const deleteCharacter = createAsyncThunk(
  'characters/delete-character',
  async (char_id, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('/admin/delete-characters', {
        char_id: char_id,
      });
      if (response?.data?.status_code === 200) {
        dispatch(fetchCharactersList());
        return response.data.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

// Get Character Details By Id | Method:
export const getCharacterDetailsById = createAsyncThunk(
  'characters/get-character-details-by-id',
  async (char_id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user/characters_edit_admin/${char_id}`);
      if (response?.data?.status_code === 200) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

// Get Tags List | Mehtod: GET
export const getTagsList = createAsyncThunk(
  'createCharacter/tags-list',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/user/tags');
      if (response?.data?.status_code === 200) {
        // console.log('response.data', response.data);
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

// Character Update | Mehtod: POST
export const updateCharacter = createAsyncThunk(
  'characters/updateCharacter',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(`user/characters_update_admin/${id}`);
      if (response?.data?.status_code === 200) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

const initialState = {
  message: null,
  error: null,
  isLoading: false,
  characterList: [],
  characterDetails: [],
  tags: [],
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    //   clearFormData: (state) => {
    //     state.characterDetails = {};
    //   },
    setSelectedTagsList: (state, action) => {
      state.selectedTags = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCharactersList.fulfilled, (state, { payload }) => {
        state.characterList = payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchCharactersList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
      .addCase(updateStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(updateStatus.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
      .addCase(deleteCharacter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCharacter.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = false;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
      .addCase(deleteCharacter.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
      .addCase(getCharacterDetailsById.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getCharacterDetailsById.fulfilled, (state, { payload }) => {
        const { id } = payload[0];
        state.characterDetails = {
          id: id,
          details: payload[0],
        };
        console.log('state.characterDetails', state.characterDetails);
        state.isLoading = false;
        state.error = false;
      })
      .addCase(getCharacterDetailsById.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
      .addCase(getTagsList.pending, (state) => {
        state.isLoading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(getTagsList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tags = payload.data;
      })
      .addCase(getTagsList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = false;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
      .addCase(updateCharacter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCharacter.fulfilled, (state, { payload }) => {
        state.characterList = payload.data;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(updateCharacter.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      });
    //   .addCase(getTagsList.pending, (state) => {
    //     state.isLoading = true;
    //     state.message = null;
    //     state.error = null;
    //   })
    //   .addCase(getTagsList.fulfilled, (state, { payload }) => {
    //     state.isLoading = false;
    //     state.tags = payload.data;
    //   })
    //   .addCase(getTagsList.rejected, (state, { payload }) => {
    //     state.isLoading = false;
    //     state.error = false;
    //     state.message =
    //       payload !== undefined && payload.message
    //         ? payload.message
    //         : 'Something went wrong. Try again later.';
    //   })

    //   .addCase(getCharacterById.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(getCharacterById.fulfilled, (state, { payload }) => {
    //     const { character_photo, name } = payload[0];
    //     state.isLoading = false;
    //     state.error = false;
    //     state.characterDetails = {
    //       name: name,
    //       photo: character_photo,
    //     };
    //   })
    //   .addCase(getCharacterById.rejected, (state, { payload }) => {
    //     state.isLoading = false;
    //     state.error = true;
    //     state.message =
    //       payload !== undefined && payload.message
    //         ? payload.message
    //         : 'Something went wrong. Try again later.';
    //   })

    //   .addCase(searchCharacter.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(searchCharacter.fulfilled, (state, { payload }) => {
    //     state.characterList = payload.data;
    //     state.isLoading = false;
    //     state.error = false;
    //   })
    //   .addCase(searchCharacter.rejected, (state, { payload }) => {
    //     state.isLoading = false;
    //     state.error = true;
    //     state.message =
    //       payload !== undefined && payload.message
    //         ? payload.message
    //         : 'Something went wrong. Try again later.';
    //   })
  },
});
export const { clearFormData, setSelectedTagsList } = characterSlice.actions;

export default characterSlice.reducer;
