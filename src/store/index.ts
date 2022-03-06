import { createStore } from 'vuex'
import app, { AppState } from './modules/app'
import permission, { PermissionState } from './modules/permission'
import settings, { SettingsState } from './modules/settings'
import tagsView, { TagsViewState } from './modules/tagsView'
import user, { UserState } from './modules/user'

interface RootState {
  app: AppState
  permission: PermissionState
  settings: SettingsState
  user: UserState
  tagsView: TagsViewState
}

const store = createStore<RootState>({
  modules: {
    app,
    permission,
    settings,
    tagsView,
    user
  }
})

export default store
